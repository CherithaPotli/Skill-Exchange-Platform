import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skillsTeach, setSkillsTeach] = useState("");
  const [skillsLearn, setSkillsLearn] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [password, setPassword] = useState("");

  const userId = localStorage.getItem("userId");
  const viewUser = JSON.parse(localStorage.getItem("viewUser"));

  const isOwnProfile = !viewUser || viewUser._id === userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isOwnProfile) {
          setUser(viewUser);
        } else {
          const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
          setUser(res.data);

          setName(res.data.name);
          setEmail(res.data.email);
          setSkillsTeach(res.data.skillsTeach.join(", "));
          setSkillsLearn(res.data.skillsLearn.join(", "));
          setPortfolio(res.data.portfolio || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userId, viewUser]);

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const updateProfile = async () => {
    if (password && !validatePassword(password)) {
      alert("Weak password ❌");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/api/users/update/${userId}`, {
        name,
        email,
        skillsTeach: skillsTeach.split(",").map(s => s.trim()),
        skillsLearn: skillsLearn.split(",").map(s => s.trim()),
        portfolio,
        ...(password && { password })
      });

      alert("Updated ✅");
      setPassword("");
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "30px" }}>

      {user && (
        <div style={card}>
          <h2>{isOwnProfile ? "👤 My Profile" : "👤 User Profile"}</h2>

          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <p><b>Teaches:</b> {user.skillsTeach.join(", ")}</p>
          <p><b>Wants:</b> {user.skillsLearn.join(", ")}</p>

          {user.portfolio && (
            <p><b>Portfolio:</b> {user.portfolio}</p>
          )}

          {!isOwnProfile && (
            <button
              onClick={() => {
                localStorage.setItem("chatUser", JSON.stringify(user));
                window.location.href = "/chat";
              }}
              style={button}
            >
              💬 Chat
            </button>
          )}
        </div>
      )}

      {isOwnProfile && (
        <div style={card}>
          <h2>✏️ Edit Profile</h2>

          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={input}/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={input}/>
          <input value={skillsTeach} onChange={(e) => setSkillsTeach(e.target.value)} placeholder="Skills Teach" style={input}/>
          <input value={skillsLearn} onChange={(e) => setSkillsLearn(e.target.value)} placeholder="Skills Learn" style={input}/>
          <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Portfolio" style={input}/>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Change Password"
            style={input}
          />

          {password && (
            <p style={{ fontSize: "12px" }}>
              <span style={{ color: password.length >= 8 ? "green" : "red" }}>• 8 chars</span><br/>
              <span style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>• Uppercase</span><br/>
              <span style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>• Lowercase</span><br/>
              <span style={{ color: /\d/.test(password) ? "green" : "red" }}>• Number</span>
            </p>
          )}

          <button onClick={updateProfile} style={button}>
            Save Profile
          </button>
        </div>
      )}
    </div>
  );
}

const card = {
  flex: 1,
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  padding: "10px",
  border: "none",
  background: "#4a6cf7",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%"
};

export default Profile;