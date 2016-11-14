console.log('routes/api/scripts');
const express = require('express');
const router = express.Router();
const { getAllMovies, addMovie } = require('../../models/movies');
const { searchMovie } = require('../../services/services');
// sendJSONresp = (req, res) => res.json(res.rows);

router.get('/movies', searchMovie, (req, res) => {
  res.render('/movies', {
    showTheMovie: res.movie || [],
  });
});

router.get('/', getAllMovies, (req, res) => {
  res.json(res.movies || []);
});
  // .get(getAllMovies, sendJSONresp)

router.post('/', addMovie, (req, res) => {
  res.json(res.movies || []);
})

module.exports = router;

