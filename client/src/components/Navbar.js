import React from "react";

function Navbar() {
  const path = window.location.pathname;

  const linkStyle = {
    margin: "0 15px",
    cursor: "pointer",
    position: "relative",
    fontWeight: "500",
    paddingBottom: "5px",
    transition: "0.3s"
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "linear-gradient(135deg, #4a6cf7, #6a8dff)",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      {/* 🔥 LOGO */}
      <h2 style={{ margin: 0 }}>🚀 SkillExchange</h2>

      {/* NAV LINKS */}
      <div style={{ display: "flex", alignItems: "center" }}>

        {/* HOME */}
        <span
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          onClick={() => {
            localStorage.removeItem("viewUser");
            window.location.href = "/";
          }}
        >
          Home
          {path === "/" && <div style={underlineStyle}></div>}
        </span>

        {/* MATCHES */}
        <span
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          onClick={() => {
            localStorage.removeItem("viewUser");
            window.location.href = "/match";
          }}
        >
          Matches
          {path === "/match" && <div style={underlineStyle}></div>}
        </span>

        {/* CHAT */}
        <span
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          onClick={() => {
            localStorage.removeItem("viewUser");
            window.location.href = "/chat";
          }}
        >
          Chat
          {path === "/chat" && <div style={underlineStyle}></div>}
        </span>

        {/* PROFILE */}
        <span
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          onClick={() => {
            localStorage.removeItem("viewUser");
            window.location.href = "/profile";
          }}
        >
          Profile
          {path === "/profile" && <div style={underlineStyle}></div>}
        </span>

        {/* LOGOUT */}
        <span
          style={{ ...linkStyle, color: "#ffe4e6" }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
          onClick={() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("viewUser");
            window.location.href = "/logout";
          }}
        >
          Logout
        </span>

      </div>
    </div>
  );
}

// 🔥 UNDERLINE STYLE
const underlineStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "2px",
  background: "white",
  borderRadius: "2px"
};

export default Navbar;