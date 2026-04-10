import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Home() {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");

  // 🔤 Get initials
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // 🎨 Avatar color
  const getColor = (name) => {
    const colors = [
      "linear-gradient(135deg, #4f7cff, #22c55e)",
      "linear-gradient(135deg, #ff7a18, #ff3d77)",
      "linear-gradient(135deg, #9333ea, #6366f1)",
      "linear-gradient(135deg, #00c9ff, #92fe9d)"
    ];
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // 🔘 Button style
  const buttonStyle = {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#4a6cf7",
    color: "white",
    cursor: "pointer"
  };

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users`);

        console.log("RAW USERS:", res.data);

        // ✅ REMOVE DUPLICATES (based on email)
        const uniqueUsers = res.data.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.email === user.email)
        );

        // ✅ REMOVE CURRENT USER
        const filteredUsers = uniqueUsers.filter(
          (user) => user._id !== userId
        );

        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [userId]);

  return (
    <div style={{ padding: "30px", background: "#f5f7fb", minHeight: "100vh" }}>
      
      <h2 style={{ marginBottom: "25px" }}>
        🌟 Explore & Connect with Learners
      </h2>

      {users.length === 0 ? (
        <p>No users found 😢</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {users.map((user) => (
            <div
              key={user._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(0,0,0,0.08)";
              }}
            >
              {/* TOP */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                
                {/* AVATAR */}
                <div
                  onClick={() => {
                    localStorage.setItem("viewUser", JSON.stringify(user));
                    window.location.href = "/profile";
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: getColor(user.name),
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    cursor: "pointer"
                  }}
                >
                  {getInitials(user.name)}
                </div>

                <h3 style={{ margin: 0 }}>{user.name}</h3>
              </div>

              {/* SKILLS */}
              <div style={{ marginTop: "15px" }}>
                <p style={{ margin: "5px 0", color: "#555" }}>
                  📘 <b>Teaches:</b> {user.skillsTeach?.join(", ")}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                  🎯 <b>Wants:</b> {user.skillsLearn?.join(", ")}
                </p>
              </div>

              {/* BUTTONS */}
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                
                <button
                  style={buttonStyle}
                  onClick={() => {
                    localStorage.setItem("chatUser", JSON.stringify(user));
                    window.location.href = "/chat";
                  }}
                >
                  💬 Chat
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem("payUser", JSON.stringify(user));
                    window.location.href = "/payment";
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#22c55e",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  💰 Pay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;