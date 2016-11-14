function getAllMovies() {
  // console.log('public/scripts');
  return fetch('/api/movies')
  .then(r => r.json());
}

function renderMovies(movies) {
  const $container = $('.more-movies').empty();
  for (let i = 0; i < movies.length; i++) {
    // creates copy of class
    const $movieTemplate = $('.movie-template').clone();
    $movieTemplate.removeClass('movie-template').addClass('movie')
    .find('.title').text(movies[i].title);
    $movieTemplate.find('.rating').text(movies[i].rating);
    $movieTemplate.find('.runtime').text(movies[i].runtime);
    $movieTemplate.find('.movie-picture img').attr('src', movies[i].poster);
    $container.append($movieTemplate);

  const $savedResults = $('.saved-results');
  const $addButton = $('<button>').text('add');
    $addButton.attr('id', movies[i].id);
    $addButton.on('click', addMovie);

    // const $editButton = $('<button>').text('edit');
    // $editButton.attr('id', movies[i].id);
    // $editButton.on('click', editMovie);

    // const $deleteButton = $('<button>').text('delete');
    // $deleteButton.attr('id', movies[i].id);
    // $deleteButton.on('click', deleteMovie);

    $savedResults.append($addButton);
    // $addButton.append($editButton);
    // $editButton.append($deleteButton);

  }
}

function searchMovies(){
  // console.log('public/script.js');
  const $button = $('button');
  const $title = $('input');

  $.ajax({
    url: 'https://www.omdbapi.com/',
    method: 'GET',
    dataType: 'json',
    data: {
      t: $title.val(),
    },
  })
  // sends data once function fully runs
  .done(data => {
    // handleResponse(data);
    let $poster = $('<ul>');
    // assign image to poster
    // $('img').attr('src', imagePath);
    $poster.attr('src', `${data.Poster}`);
    let $title = $('<ul>');
    $title.text(`Title: ${data.Title}`);
    let $rated = $('<ul>');
    $rated.text(`Rating: ${data.Rated}`);
    let $runtime = $('<ul>');
    $runtime.text(`Runtime: ${data.Runtime}`);
    $('ul').empty();
    $('#movies').append($poster);
    $('#movies').append($title);
    $('#movies').append($rated);
    $('#movies').append($runtime);
    console.log('Data: ', data);
  })
  .fail(err => {
    console.log('Error', err);
  })
  $button.on('click', searchMovies);
}

function addMovie(payload) {
  return fetch('/api/movies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}


$(() => {
  getAllMovies().then(renderMovies),
  searchMovies();
  addMovie();
});
