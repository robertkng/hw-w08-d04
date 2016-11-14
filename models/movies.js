console.log('models/movie.js');

// const { ObjectID } = require('moviesdb');
const db = require('../lib/dbconnect');

function getAllMovies(req, res, next) {
  db.any('SELECT * FROM movies;')
  .then((movies) => {
    res.movies = movies;
    next();
  })
  .catch(error => next(error));
}

function addMovie(req, res, next) {
  db.none(`INSERT INTO movies (title, rating, runtime, poster)
    VALUES ($1, $2, $3, $4);`, [req.body.Title, req.body.Runtime, req.body.Rated, req.body.Genre, req.body.Poster])
  .then((movies) => {
    res.movies = movies;
    next();
  })
  .catch(error => next(error));
}

module.exports = {
  getAllMovies,
  addMovie,
};
