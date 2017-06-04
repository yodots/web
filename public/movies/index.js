import template from './index.html';
import {logout} from '../../services/login';
import {decrypt} from '../../system/security';
import {createMovieAPI, changeMovieAPI, deleteMovieAPI, getAllMoviesAPI} from '../../services/movies';
import components from '../../components'
import $ from 'jquery';

export default function() {
  const user = decrypt(window.localStorage.getItem(process.env.token));

	$('.wrapper').html(template);
  $('#login-block').html(`<p>Welcome back, ${user._doc.username}!</p><div class="center"><button type="submit" class="logout-button">Log Out</button></div>`);


  getAllMoviesAPI(user._doc._id)
    .then((movies) => {
      // get all the movies associated with this user and pass them to the movies component to be rendered
      components.movies(movies, $('#movies'));
    })
    .catch((err) => {
      console.error(err);
    });


    // logout
  $('#login-block').on('click', '.logout-button', function(event) {
      event.preventDefault();
      logout();
  });


  // upon clicking the "Add a Movie" button, produce the menus to enter a new movie
  $('.wrapper').on('click', '.add-movie-button', function(event) {
    event.preventDefault();

    // movie input will have a dropdown

    $('.database-add').html(`<p>movie title:</p>
      <input type="text" name="movie-title" id="movie-title"><br />
      <p>dropdown for date:</p>
      <input type="text" name="movie-year" id="movie-year"><br />
      <input type="text" name="movie-month" id="movie-month"><br />
      <input type="text" name="movie-day" id="movie-day"><br />
      <button type="submit" class="movie-database-button">Submit</button>`);
  });


  // add a movie to the user's database
  $('.wrapper').on('click', '.movie-database-button', function(event) {
    event.preventDefault();

    const data = {
      title: $('#movie-title').val(),
      date: {
        year: $('#movie-year').val(),
        month: $('#movie-month').val(),
        day: $('#movie-day').val()
      }
    };

    createMovieAPI(user._doc._id, data)
      .then(() => {
        return getAllMoviesAPI(user._doc._id);
      })
      .then((movies) => {
        components.movies(movies, $('#movies'));
      })
      .catch((err) => {
        console.error(err);
      });

  });


  // delete a movie from the user's database
  $('.wrapper').on('click', '.delete-movie-button', function(event) {
    event.preventDefault();

    const movieId = $(this).attr('data-id');

    deleteMovieAPI(user._doc._id, movieId)
      .then(() => {
        return getAllMoviesAPI(user._doc._id);
      })
      .then((movies) => {
        components.movies(movies, $('#movies'));
      })
      .catch((err) => {
        console.error(err);
      });

  });


  // edit a movie's title
  $('.wrapper').on('click', '.edit-title-text', function(event) {
    event.preventDefault();

    $(this).parent('span').html(`<input type="text" name="new-title" id="new-title">
                                <button type="submit" class="new-title-button">Submit</button>`);

  });

  $('.wrapper').on('click', '.new-title-button', function(event) {
    event.preventDefault();

    const movieId = $(this).parent('span').attr('data-id');
    const data = { title: $('#new-title').val() };

    changeMovieAPI(user._doc._id, movieId, data)
      .then(() => {
        return getAllMoviesAPI(user._doc._id);
      })
      .then((movies) => {
        components.movies(movies, $('#movies'));
      })

  });


  // edit a movie's date
  // stuff


  // edit a movie's star rating
  $('.wrapper').on('click', '.edit-starRating-text', function(event) {
    event.preventDefault();

    $(this).parent('span').html(`<input type="text" name="new-starRating" id="new-starRating">
                                <button type="submit" class="new-starRating-button">Submit</button>`);

  });

  $('.wrapper').on('click', '.new-starRating-button', function(event) {
    event.preventDefault();

    const movieId = $(this).parent('span').attr('data-id');
    const data = { starRating: Number($('#new-starRating').val()) };

    changeMovieAPI(user._doc._id, movieId, data)
      .then(() => {
        return getAllMoviesAPI(user._doc._id);
      })
      .then((movies) => {
        components.movies(movies, $('#movies'));
      })

  });


  // edit a movie's review
  $('.wrapper').on('click', '.edit-review-button', function(event) {
    event.preventDefault();

    $(this).parent('div').html(`<input type="textarea" name="new-review" id="new-review">
                                <button type="submit" class="new-review-button">Submit</button>`);

  });

  $('.wrapper').on('click', '.new-review-button', function(event) {
    event.preventDefault();

    const movieId = $(this).parent('div').attr('data-id');
    const data = { review: $('#new-review').val() };

    changeMovieAPI(user._doc._id, movieId, data)
      .then(() => {
        return getAllMoviesAPI(user._doc._id);
      })
      .then((movies) => {
        components.movies(movies, $('#movies'));
      })

  });

}