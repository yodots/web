import template from './index.html';
import {loginAPI} from '../../services/login';
import $ from 'jquery';
import security from '../../system/security';

export default function() {
	$('.wrapper').html(template);

  $('#login-block').on('keyup', '#password', function(event) {
    event.preventDefault();

    if (event.keyCode == 13)
      $('.login-button').trigger('click');
  });
	
	$('#login-block').on('click', '.login-button', function(event) {
    event.preventDefault();

    const data = {
      email: $('#email').val(),
      password: $('#password').val()
    };

    loginAPI(data);

  });

  $('.wrapper').on('click', '.registration-button', function(event) {
    event.preventDefault();

    window.location.hash = '#/register';
  });

}