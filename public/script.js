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
    const $editButton = $('<button>').text('edit');
    $editButton.attr('id', movies.id);
    $editButton.on('click', editMovie);
    const $deleteButton = $('<button>').text('delete');
    $deleteButton.attr('id', movies.id);
    $deleteButton.on('click', deleteMovie);



    $movieTemplate.append($editButton);

  }
}

function searchMovies(){
  // console.log('public/script.js');
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
    console.log('data: ', data)
    let $poster = $('<img>');
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
    const $savedResults = $('.saved-results').empty();
    const $addButton = $('<button>').text('add');
    $addButton.attr('id', movies.id);
    $addButton.on('click', () => {
      const movieInfo = {
        title: data.Title,
        poster : data.Poster,
        rating: data.imdbRating,
        runtime: data.Runtime,
      };
      addMovie(movieInfo);
    });

    $savedResults.append($addButton);
  })
  .fail(err => {
    console.log('Error', err);
  })
} // searchMovies

function addMovie(payload) {
  // console.log(payload)
  fetch('/api/movies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function editMovie(edit) {
  fetch('/api/movies/edit/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(edit)
  })
  .then(renderMovies);
}

function deleteMovie(delete) {
  fetch('/api/movies/:id', {
    method: 'DELETE',
  })
  .then(renderMovies);
}

$(() => {
  getAllMovies().then(renderMovies)
  const $button = $('button');
  $button.on('click', searchMovies);
  editMovie();
  deleteMovie();
});
