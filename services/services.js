// set up dependencies and API variables
const fetch = require('node-fetch');
const API_URL = "http://img.omdbapi.com/?";

// set up function to query within the API
function searchMovie(req, res, next) {
  fetch(`${API_URL}t=${req.query.movie}&y=&plot=short&r=json`)

//parses the json string on the server
  .then(results => results.json())
  .then((results) => {
    res.movie = results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchMovie };

