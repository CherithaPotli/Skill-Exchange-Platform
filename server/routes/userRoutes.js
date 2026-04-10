const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Message = require("../models/Message");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, skillsTeach, skillsLearn } = req.body;

    // 🔴 CHECK DUPLICATE USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      skillsTeach,
      skillsLearn
    });

    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL USERS =================
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET USER BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CHAT =================

// 🔥 SEND MESSAGE
router.post("/send", async (req, res) => {
  const { senderId, receiverId, text } = req.body;

  const msg = new Message({ senderId, receiverId, text });
  await msg.save();

  res.json(msg);
});

// 🔥 GET CHAT BETWEEN 2 USERS
router.get("/chat/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});

// 🔥 GET CHAT USERS (LEFT PANEL)
router.get("/chat-users/:userId", async (req, res) => {
  const userId = req.params.userId;

  const messages = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  });

  const userIds = new Set();

  messages.forEach((msg) => {
    if (msg.senderId !== userId) userIds.add(msg.senderId);
    if (msg.receiverId !== userId) userIds.add(msg.receiverId);
  });

  const users = await User.find({
    _id: { $in: Array.from(userIds) }
  });

  res.json(users);
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const Payment = require("../models/Payment");

// 💳 SAVE PAYMENT
router.post("/pay", async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  const payment = new Payment({
    senderId,
    receiverId,
    amount
  });

  await payment.save();

  res.json({ message: "Payment successful ✅" });
});

// CHECK IF USER EXISTS
const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}
module.exports = router;