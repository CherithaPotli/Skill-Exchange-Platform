require("dotenv").config();
const express = require("express");


const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", require("./routes/userRoutes"));

// MongoDB
//mongoose.connect("mongodb+srv://cheritha287_db_user:jmx3BkPm3p71b8qZ@skillexchange.apyrbea.mongodb.net/skill-exchange?retryWrites=true&w=majority")
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});