let express = require("express");
let cors = require("cors");
let { getAllMovies, getMovieById } = require("./controllers");
let app = express();
app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Movies
app.get("/movies", async (req, res) => {
  try {
    let result = await getAllMovies();
    if (result.length === 0) {
      return res.status(404).json({ error: "Movies not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
// Exercise 2: Retrieve Movie by ID
app.get("/movies/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await getMovieById(id);
    if (! result) {
      return res.status(404).json({ error: "Movie not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
module.exports = { app };