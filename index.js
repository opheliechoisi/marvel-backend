require("dotenv").config(); // Charger les variables d’environnement

const express = require("express");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
const app = express();

const apiKey = process.env.MARVEL_API_KEY;

// === Route GET /comics ===
app.get("/comics", async (req, res) => {
  try {
    const { limit, skip, title, name } = req.query;

    const apiUrl = "https://lereacteur-marvel-api.herokuapp.com/comics";

    const params = {
      apiKey,
      ...(limit && { limit }),
      ...(skip && { skip }),
      ...(title && { title }),
      ...(name && { name }),
    };

    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// === Route GET /characters ===
app.get("/characters", async (req, res) => {
  try {
    const { skip, limit, name } = req.query;

    const apiUrl = "https://lereacteur-marvel-api.herokuapp.com/characters";

    const params = {
      apiKey,
      ...(limit && { limit }),
      ...(skip && { skip }),
      ...(name && { nameStartsWith: name }),
    };

    const response = await axios.get(apiUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// === Route GET /comics/:characterId ===
app.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}`;

    const response = await axios.get(apiUrl, {
      params: { apiKey },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// === Route GET /comic/:comicId ===
app.get("/comic/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;

    const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}`;

    const response = await axios.get(apiUrl, {
      params: { apiKey },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// === Route 404 (catch-all) ===
app.all(/.*/, (req, res) => {
  res.status(404).json({ error: "Page introuvable" });
});

app.listen(3000, () => {
  console.log("Server Started 🦸🏽‍♀️🦸🏽‍♀️🦸🏽‍♀️");
});
