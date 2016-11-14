require('dotenv').config({ silent: true});
const express = require('express');

// used to push render the data from the json
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const moviesRoute = require('./routes/api/movies');
app.use('/api/movies', moviesRoute);

app.listen(PORT, () => console.log('server is listening'));

