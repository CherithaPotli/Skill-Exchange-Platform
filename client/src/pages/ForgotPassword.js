import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 PASSWORD VALIDATION
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleReset = async () => {
    if (!validatePassword(password)) {
      alert("Weak password ❌");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/users/reset-password`, {
        email,
        newPassword: password
      });

      alert("Password updated ✅");
      window.location.href = "/";
    } catch (err) {
      alert("User not found ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Reset Password 🔐</h2>

        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {/* 🔥 LIVE HINT */}
        {password && (
          <p style={{ fontSize: "12px" }}>
            <span style={{ color: password.length >= 8 ? "green" : "red" }}>• 8 chars</span><br/>
            <span style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>• Uppercase</span><br/>
            <span style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>• Lowercase</span><br/>
            <span style={{ color: /\d/.test(password) ? "green" : "red" }}>• Number</span>
          </p>
        )}

        <button onClick={handleReset} style={button}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

// STYLES
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('/bg.png')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center 15%"
};

const card = {
  padding: "30px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  width: "300px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#4a6cf7",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default ForgotPassword;