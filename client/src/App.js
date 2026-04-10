import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Payment from "./pages/Payment"; 

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // 🔥 Update when localStorage changes
  useEffect(() => {
    const checkUser = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  return (
    <Router>
      {/* Show Navbar only if logged in */}
      {userId && <Navbar />}

      <Routes>
        {/* AUTH */}
        <Route path="/" element={userId ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN */}
        <Route path="/match" element={<Match />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;