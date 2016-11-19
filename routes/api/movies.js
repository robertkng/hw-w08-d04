console.log('routes/api/scripts');
const express = require('express');
const router = express.Router();
const { getAllMovies, addMovie, editMovie, deleteMovie } = require('../../models/movies');
const { searchMovie } = require('../../services/services');

router.get('/movies', searchMovie, (req, res) => {
  res.render('/movies', {
    showTheMovie: res.movie || [],
  });
});

router.get('/', getAllMovies, (req, res) => {
  res.json(res.movies || []);
});

router.post('/', addMovie, (req, res) => {
  res.json(res.movies || []);
})

router.put('/:id', editMovie, (req,res) => {
  res.json(res.movies || []);
})

router.delete('/:id', deleteMovie, (req,res) => {
  res.json(res.movies || []);
})

module.exports = router;

