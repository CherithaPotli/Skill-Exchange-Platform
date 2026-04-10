import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skillsTeach, setSkillsTeach] = useState("");
  const [skillsLearn, setSkillsLearn] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase and 1 number"
      );
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/users/register`, {
        name,
        email,
        password,
        skillsTeach: skillsTeach.split(",").map(s => s.trim()),
        skillsLearn: skillsLearn.split(",").map(s => s.trim())
      });

      alert("Registered Successfully ✅");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `
          linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)),
          url('/bg.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          color: "white",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account 🚀
        </h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {password && (
          <p style={{ fontSize: "12px", marginBottom: "10px" }}>
            Password must contain:
            <br />
            <span style={{ color: password.length >= 8 ? "#22c55e" : "red" }}>
              • At least 8 characters
            </span>
            <br />
            <span style={{ color: /[A-Z]/.test(password) ? "#22c55e" : "red" }}>
              • 1 uppercase letter
            </span>
            <br />
            <span style={{ color: /[a-z]/.test(password) ? "#22c55e" : "red" }}>
              • 1 lowercase letter
            </span>
            <br />
            <span style={{ color: /\d/.test(password) ? "#22c55e" : "red" }}>
              • 1 number
            </span>
          </p>
        )}

        <input
          placeholder="Skills you teach (comma separated)"
          value={skillsTeach}
          onChange={(e) => setSkillsTeach(e.target.value)}
          style={input}
        />

        <input
          placeholder="Skills you want (comma separated)"
          value={skillsLearn}
          onChange={(e) => setSkillsLearn(e.target.value)}
          style={input}
        />

        <button onClick={handleRegister} style={button}>
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "14px"
          }}
          onClick={() => (window.location.href = "/")}
        >
          Already have an account?{" "}
          <span style={{ color: "lightblue" }}>Login</span>
        </p>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #4a6cf7, #6a8dff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Register;