/*require("dotenv").config(); // Charger les variables d’environnement

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express(); // <- créer l'app express **avant** d'utiliser app.use
app.use(cors()); // <- middleware CORS

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
app.all(/.*/ /*, /*(req, res) => {
 /* res.status(404).json({ error: "Page introuvable" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
})*/

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//                ROUTE PERSONNAGES                   //
app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});
//          ROUTE COMICS            //
app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});
//                  ROUTE COMICS CHARACTER ID                 //
app.get("/comics/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
