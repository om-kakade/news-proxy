import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.NEWS_API_KEY; // 🔑 load from environment

app.use(cors());

app.get("/api/news", async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Required for Vercel health check
app.get("/", (req, res) => {
  res.send("✅ News API Proxy is running. Use /api/news");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
