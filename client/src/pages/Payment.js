import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Payment() {
  const [amount, setAmount] = useState("");

  const userId = localStorage.getItem("userId");
  const receiver = JSON.parse(localStorage.getItem("payUser"));

  const handlePay = async () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/users/pay`, {
        senderId: userId,
        receiverId: receiver._id,
        amount
      });

      alert("Payment Successful 💳");
      window.location.href = "/";
    } catch (err) {
      alert("Payment failed ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>💳 Payment</h2>

        <p>Paying to: <b>{receiver?.name}</b></p>

        <input
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={input}
        />

        <button onClick={handlePay} style={button}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

const container = {
  height: "90vh",
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
  boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const button = {
  padding: "10px",
  width: "100%",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px"
};

export default Payment;