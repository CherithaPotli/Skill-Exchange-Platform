import React, { useEffect } from "react";

function Logout() {

  useEffect(() => {
    // 🔥 CLEAR EVERYTHING (BEST PRACTICE)
    localStorage.clear();

    // 🔥 FORCE REFRESH STATE (IMPORTANT)
    setTimeout(() => {
      window.location.href = "/";
    }, 1500); // small delay so user sees logout screen
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // 🔥 BACKGROUND
        background: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0,0,0,0.7)),
          url('/bg.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* 🔥 GLASS CARD */}
      <div
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "50px",
          borderRadius: "20px",
          width: "360px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>
          👋 Logged Out
        </h1>

        <p style={{ marginBottom: "25px", fontSize: "16px", opacity: 0.9 }}>
          Thank you for using <b>SkillExchange</b> 💙
        </p>

        <button
          onClick={() => window.location.href = "/"}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #4a6cf7, #6a8dff)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Go to Login 🔐
        </button>
      </div>

    </div>
  );
}

export default Logout;