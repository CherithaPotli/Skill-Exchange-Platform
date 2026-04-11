import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function Payment() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

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

        {/* STEP 1: SELECT METHOD */}
        <div style={{ marginBottom: "15px" }}>
          <p style={{ marginBottom: "8px" }}>Select Payment Method:</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setMethod("card")}
              style={{
                ...methodBtn,
                background: method === "card" ? "#3b82f6" : "#e5e7eb",
                color: method === "card" ? "white" : "black"
              }}
            >
              💳 Card
            </button>

            <button
              onClick={() => setMethod("upi")}
              style={{
                ...methodBtn,
                background: method === "upi" ? "#3b82f6" : "#e5e7eb",
                color: method === "upi" ? "white" : "black"
              }}
            >
              📱 UPI
            </button>
          </div>
        </div>

        {/* STEP 2: SHOW FORM BASED ON METHOD */}
        {method === "card" && (
          <>
            <input placeholder="Card Number" style={input} />
            <input placeholder="Expiry (MM/YY)" style={input} />
            <input placeholder="CVV" style={input} />
          </>
        )}

        {method === "upi" && (
          <input placeholder="Enter UPI ID" style={input} />
        )}

        {/* STEP 3: AMOUNT */}
        {method && (
          <>
            <input
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={input}
            />

            <button onClick={handlePay} style={button}>
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* STYLES */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 15%",
  padding: "20px"
};

const card = {
  width: "100%",
  maxWidth: "400px",
  padding: "25px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const button = {
  padding: "12px",
  width: "100%",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

const methodBtn = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Payment;