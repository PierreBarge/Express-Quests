const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyUser,
} = require("./middlewares/auth");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", hashPassword, validateUser, userControllers.postUser);

app.post(
  "/api/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken);

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

app.put(
  "/api/users/:id",
  verifyUser,
  hashPassword,
  validateUser,
  userControllers.updateUser
);
app.delete("/api/users/:id", verifyUser, userControllers.deleteUser);

module.exports = app;
