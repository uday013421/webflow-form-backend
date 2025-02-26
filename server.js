require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const formRoutes = require("./routes/formRoutes");

const app = express();

// CORS Configuration (Restrict later for production)
app.use(cors({
    origin: "*",  // Change to specific origin in production
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));

// Middleware
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});

// Routes
app.use("/api/form", formRoutes);

// Default Route (For testing)
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
