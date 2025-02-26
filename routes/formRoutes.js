const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

router.post("/", async (req, res) => {
    try {
      console.log("Received Webflow Form Data:", req.body); // Debugging
  
      // Webflow sends form data inside `data` object
      const { data } = req.body;
      const { name, email, message } = data || req.body; 
  
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const newEntry = new FormData({ name, email, message });
      await newEntry.save();
  
      console.log("Saved to MongoDB:", newEntry);
      res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "Error processing form submission" });
    }
  });

module.exports = router;
