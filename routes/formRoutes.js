const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

router.post("/", async (req, res) => {
  try {
    console.log("🔹 Received Data:", req.body); // Log incoming data

    const { data } = req.body;
    const { name, email, message } = data || {}; // Ensure data is properly extracted

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newEntry = new FormData({ name, email, message });
    await newEntry.save(); // Save data to MongoDB

    console.log("✅ Data saved successfully:", newEntry);
    res.status(200).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("❌ Error saving form data:", error);
    res.status(500).json({ error: "Error processing form submission" });
  }
});

module.exports = router;
