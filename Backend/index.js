require("dotenv").config(); 
const express = require("express");
const connectDB = require("./config/db");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 
connectDB(); 
app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Sprint 10 API is live " });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
