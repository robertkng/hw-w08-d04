console.log('models/movie.js');

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
  db.none('INSERT INTO movies (title, poster, rating, runtime) VALUES ($1, $2, $3, $4)', [req.body.title, req.body.poster, req.body.rating, req.body.runtime])
  .then((movies) => {
    res.results = movies;
    next();
  })
  .catch(error => next(error));
}

function editMovie(req, res, next) {
  db.none(`UPDATE movies
    SET title = $1, poster = $2, rating = $3, runtime = $4
    WHERE id = $5`, [req.body.title, req.body.poster, req.body.rating, req.body.runtime, req.body.id])
  .then(() => {
    next();
  })
  .catch((err) => {
    next(err);
  });
}

function deleteMovie(req, res, next) {
  db.result(`DELETE FROM movies
    WHERE id = $1`, [req.params.id])
  .then((movies) => {
    res.results = movies;
    next();
  })
  .catch(error => next(error));
}


module.exports = {
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovie,
};
