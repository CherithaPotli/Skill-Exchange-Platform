import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Welcome to SkillSwap 🚀</h2>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <p>Start exploring users and connect to learn new skills!</p>

        <br />

        <button onClick={() => window.location.pathname = "/"}>
          Go to Home 🔥
        </button>
      </div>
    </div>
  );
}

export default Dashboard;