const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

router.post("/", async (req, res) => {
    try {
        console.log("Received Webflow Form Data:", req.body); // Debugging

        // Webflow sends form data as `fields` object instead of `data`
        const { fields } = req.body;

        if (!fields || !fields.Name || !fields.Email || !fields.message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create a new entry with proper field extraction
        const newEntry = new FormData({
            name: fields.Name,
            email: fields.Email,
            message: fields.message,
        });

        await newEntry.save();

        console.log("Saved to MongoDB:", newEntry);
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
