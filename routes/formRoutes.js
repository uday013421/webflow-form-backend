const express = require("express");
const FormData = require("../models/FormData");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newEntry = new FormData({ name, email, message });
    await newEntry.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

module.exports = router;
