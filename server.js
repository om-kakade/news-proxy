import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "5c935db87fc6423991967af5bb47ca2b"; // replace with your key

app.use(cors());

app.get("/api/news", async (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${'business'}&pageSize=18&apiKey=${API_KEY}`;
  console.log("➡️ Fetching:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ News API Proxy is running. Use /api/news");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
