const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK (Backend)
const serviceAccount = require("./firebase-admin-sdk.json"); // Download from Firebase Console
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dessertstore"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Middleware to Verify Firebase Token
async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized access" });

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

// API Route to Store User Data (Signup)
app.post("/api/signup", verifyToken, (req, res) => {
    const { userId, name, email } = req.body;
    const query = "INSERT INTO users (userId, name, email) VALUES (?, ?, ?)";
    db.query(query, [userId, name, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "User added successfully" });
    });
});

// API Route to Get User Profile
app.get("/api/profile", verifyToken, (req, res) => {
    const userId = req.user.uid;
    db.query("SELECT * FROM users WHERE userId = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result[0]); // Return user details
    });
});

// API Route to Update Profile
app.post("/api/profile", verifyToken, (req, res) => {
    const { name, email, profilePicture } = req.body;
    const userId = req.user.uid;
    db.query("UPDATE users SET name = ?, profilePicture = ? WHERE userId = ?", 
    [name, profilePicture, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Profile updated successfully" });
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
