import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      //store userid
      localStorage.setItem("userId", res.data._id);

      window.location.href = "/"; // redirect to home
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 15%",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "45px",
          borderRadius: "20px",
          width: "380px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ marginBottom: "25px", marginRight: "22px", color: "#333" }}>
          🚀 Login
        </h2>

        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#4a6cf7",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.background = "#2f4be0";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.background = "#4a6cf7";
          }}
        >
          Log In
        </button>

        <p style={{ marginTop: "15px", color: "#555" }}>
          Don’t have an account?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline", color: "#4a6cf7" }}
            onClick={() => (window.location.href = "/register")}
          >
            Sign Up
          </span>
        </p>

        <p
          onClick={() => (window.location.href = "/forgot")}
          style={{ cursor: "pointer", fontSize: "14px" }}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default Login;