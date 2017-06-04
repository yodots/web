import template from './index.html';
import $ from 'jquery';
import {logout} from '../../services/login';
import {decrypt} from '../../system/security';
import {changeUsernameAPI} from '../../services/settings';

export default function() {

  const user = decrypt(window.localStorage.getItem(process.env.token));

	$('.wrapper').html(template);
	$('#login-block').html(`<p>Welcome back, ${user._doc.username}!</p><div class="center"><button type="submit" class="logout-button">Log Out</button></div>`);

	$('#login-block').on('click', '.logout-button', function(event) {
    event.preventDefault();
    logout();
  });

  $('.wrapper').on('click', '.change-username-button', function(event) {
    event.preventDefault();
    const newUsername = $('#change-username').val();

    changeUsernameAPI(user._doc._id, newUsername);

    $('main').html(`<p>Your username has been changed. <a href="/#/movies">Click here</a> to return to your movies.</p>`);
    $('#login-block').html(`<p>Welcome back, ${newUsername}!</p><div class="center"><button type="submit" class="logout-button">Log Out</button></div>`);

  });

}