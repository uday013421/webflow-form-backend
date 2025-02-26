const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData"); // Ensure this is correctly imported

router.post("/", async (req, res) => {
  try {
    const { data = {} } = req.body; // Default to empty object if data is undefined
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields (name, email, message) are required." });
    }

    const newEntry = new FormData({ name, email, message });
    await newEntry.save();

    res.status(201).json({ success: true, message: "Form data saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving form data:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

module.exports = router;

  
