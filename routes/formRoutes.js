const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

// Middleware to parse URL-encoded data (Webflow sends it this way)
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/webhook", async (req, res) => {
    try {
        console.log("🔹 Received Webflow Webhook Data:", req.body); // Debugging

        // Webflow sends data inside "data" object
        const { data } = req.body;
        
        // Extract form fields properly
        const name = data?.["fields[Name]"] || data?.name;
        const email = data?.["fields[Email]"] || data?.email;
        const message = data?.["fields[message]"] || data?.message;

        if (!name || !email || !message) {
            console.error("❌ Missing required fields:", req.body);
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Save to MongoDB
        const newEntry = new FormData({ name, email, message });
        await newEntry.save();

        console.log("✅ Saved to MongoDB:", newEntry);
        res.status(200).json({ message: "Form data saved successfully" });
    } catch (error) {
        console.error("❌ Error saving data:", error);
        res.status(500).json({ error: "Error processing webhook data" });
    }
});

module.exports = router;
