require("dotenv").config();
const express = require("express");
const cors    = require("cors");
require("./db");

const postRoutes = require("./posts");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://week-11-mission11-3tsj.vercel.app",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());


app.use("/api/posts", postRoutes);   

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CineStream API live 🎬" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
