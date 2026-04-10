import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Chat() {
  const userId = localStorage.getItem("userId");

  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔥 Fetch chat users
  const fetchChatUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/chat-users/${userId}`);
      setChatUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Fetch messages
  const fetchMessages = async (user) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/users/chat/${userId}/${user._id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchChatUsers();

    const storedUser = JSON.parse(localStorage.getItem("chatUser"));

    if (storedUser && storedUser._id !== userId) {
      setSelectedUser(storedUser);
      fetchMessages(storedUser);

      setChatUsers((prev) => {
        const exists = prev.find((u) => u._id === storedUser._id);
        if (!exists) return [storedUser, ...prev];
        return prev;
      });
    } else {
      localStorage.removeItem("chatUser");
    }
  }, []);

  // 🔥 Send message
  const sendMessage = async () => {
    if (!text.trim() || !selectedUser) return;

    try {
      await axios.post(`${BASE_URL}/api/users/send`, {
        senderId: userId,
        receiverId: selectedUser._id,
        text
      });

      setText("");
      fetchMessages(selectedUser);
      fetchChatUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", height: "90vh" }}>
      
      {/* LEFT SIDE */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ddd",
          padding: "10px",
          overflowY: "auto"
        }}
      >
        <h3>Chats</h3>

        {chatUsers.length === 0 ? (
          <p>No chats yet</p>
        ) : (
          chatUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setMessages([]);
                fetchMessages(user);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderRadius: "10px",
                marginBottom: "8px",
                background:
                  selectedUser?._id === user._id ? "#e6f0ff" : "white",
                border: "1px solid #eee"
              }}
            >
              {user.name}
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ width: "70%", padding: "20px" }}>
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>

            <div
              style={{
                height: "400px",
                overflowY: "auto",
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "10px"
              }}
            >
              {messages.length === 0 ? (
                <p>No messages yet</p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign:
                        msg.senderId === userId ? "right" : "left",
                      margin: "6px 0"
                    }}
                  >
                    <span
                      style={{
                        background:
                          msg.senderId === userId
                            ? "#4a6cf7"
                            : "#e5e5ea",
                        color:
                          msg.senderId === userId ? "white" : "black",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        display: "inline-block",
                        maxWidth: "60%"
                      }}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
                style={{
                  padding: "10px",
                  flex: 1,
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 16px",
                  background: "#4a6cf7",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <h3>Select a chat</h3>
        )}
      </div>
    </div>
  );
}

export default Chat;