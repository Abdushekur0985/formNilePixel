import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("❌ Database connection error:", err);
  else console.log("✅ Database connected successfully");
});

// JWT verification middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token3;
  if (!token) return res.status(401).json({ Status: "error", error: "unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Status: "error", error: "unauthorized" });
    req.user = decoded;
    next();
  });
};

// Root route
app.get("/", (_, res) => {
  res.send("🚀 Backend is running...");
});

// Signup
app.post("/signup", upload.single("imageProfile"), (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const imageProfile = req.file?.filename || null;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  db.query("SELECT * FROM signup WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    if (results.length > 0) return res.status(400).json({ message: "Email already exists" });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      const sql = "INSERT INTO signup (name, email, password, confirmPassword, imageProfile) VALUES (?, ?, ?, ?, ?)";
      const values = [name, email, hash, hash, imageProfile];

      db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ message: "Insertion error" });
        res.status(200).json({ message: `${name} registered successfully`, image: imageProfile });
      });
    });
  });
});

// Logout
app.post("/logout", (_, res) => {
  res.clearCookie("token3", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM signup WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(400).json({ message: "Email not found" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token3", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          imageProfile: user.imageProfile,
        },
      });
    });
  });
});

// Forgot Password
app.post("/forgotPassword", (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM signup WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpire = Date.now() + 15 * 60 * 1000;

    db.query(
      "UPDATE signup SET reset_token = ?, reset_token_expire = ? WHERE email = ?",
      [resetToken, tokenExpire, email],
      (err) => {
        if (err) return res.status(500).json({ message: "Error saving token" });

        console.log(` Reset Link: ${process.env.FRONTEND_URL}/resetPassword/${resetToken}`);
        res.json({ message: "If this email is registered, a password reset link was sent." });
      }
    );
  });
});

// Reset Password
app.post("/resetPassword/:token", (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  db.query(
    "SELECT * FROM signup WHERE reset_token = ? AND reset_token_expire > ?",
    [token, Date.now()],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0) return res.status(400).json({ message: "Invalid or expired reset link" });

      const user = results[0];
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        db.query(
          "UPDATE signup SET password = ?, confirmPassword = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?",
          [hash, hash, user.id],
          (err) => {
            if (err) return res.status(500).json({ message: "Error updating password" });
            res.json({ message: "Password has been updated successfully" });
          }
        );
      });
    }
  );
});

// Protected route
app.get("/home", verifyUser, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

 