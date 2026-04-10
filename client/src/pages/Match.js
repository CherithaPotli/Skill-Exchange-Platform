import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Match() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const userId = localStorage.getItem("userId");

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    background: "#4a6cf7",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${BASE_URL}/api/users/${userId}`);
        const res2 = await axios.get(`${BASE_URL}/api/users`);

        setCurrentUser(res1.data);
        setUsers(res2.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const matches = users.filter((user) => {
    if (!currentUser) return false;
    if (user._id === currentUser._id) return false;

    return (
      user.skillsTeach.some(skill =>
        currentUser.skillsLearn.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      ) &&
      user.skillsLearn.some(skill =>
        currentUser.skillsTeach.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      )
    );
  });

  return (
    <div className="page" style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "25px" }}>🔥 Your Matches</h2>

      {matches.length === 0 ? (
        <p>No matches found 😢</p>
      ) : (
        matches.map((user) => (
          <div
            key={user._id}
            style={{
              background: "white",
              padding: "20px",
              margin: "15px 0",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => {
                    localStorage.setItem("viewUser", JSON.stringify(user));
                    window.location.href = "/profile";
                  }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4f7cff, #22c55e)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  {getInitials(user.name)}
                </div>

                <span
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "10px",
                    height: "10px",
                    background: "#22c55e",
                    borderRadius: "50%",
                    border: "2px solid white"
                  }}
                />
              </div>

              <h3 style={{ margin: 0 }}>{user.name}</h3>
            </div>

            <p style={{ marginTop: "10px" }}><b>📘 Teaches:</b></p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {user.skillsTeach.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: "#eef2ff",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <p style={{ marginTop: "10px" }}><b>🎯 Wants:</b></p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {user.skillsLearn.map((skill, i) => (
                <span
                  key={i}
                  style={{
                    background: "#ecfdf5",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "10px" }}>
              <button
                style={buttonStyle}
                onClick={() => {
                  localStorage.setItem("chatUser", JSON.stringify(user));
                  window.location.href = "/chat";
                }}
              >
                Chat 💬
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
        ))
      )}
    </div>
  );
}

export default Match;