const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/media", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Movie = mongoose.model("movies", {
  name: String,
  img: String,
  summary: String,
});

app.use(bodyParser.json());

app.post("/movies", (req, res) => {
  const movieData = req.body;
  const movie = new Movie(movieData);
  movie.save((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/movies", (req, res) => {
  Movie.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.put("/movies/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Movie updated successfully");
    }
  });
});

app.delete("/movies/:id", (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Movie deleted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
