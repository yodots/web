import API from '../system/api';
import {encrypt} from '../system/security';

export function registerAPI(data) {
  API.post('/users', { payload: encrypt(data) })
    .then((response) => {
      return `<p>Thank you for registering! Please log in on the <a href="/#">main page</a>.</p>`;
    })
    .catch((err) => {
      console.error(err);
    })
}