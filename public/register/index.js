import template from './index.html';
import {decrypt} from '../../system/security';
import $ from 'jquery';
import {registerAPI} from '../../services/register';

export default function() {
  $('.wrapper').html(template);

  $('.wrapper').on('click', '.register', function(event) {
  	event.preventDefault();

  	const data = {
  	  username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val()
    };

    registerAPI(data);

  })
}