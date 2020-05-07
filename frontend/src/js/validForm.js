/* eslint-disable camelcase */
/**
 * Name : orinoco
 * Create : 2020/04/05
 * Version : 1.0.0
 * Author : François, Joël Lesenne
 * Site : <https://ocr-dw.s3.eu-west-3.amazonaws.com/orinoco/index.html>
 * Depot : <https://github.com/joellesenne/orinoco>
 * Licence : MIT <https://mit-license.org/>
 */

/**
 * Import modules outside
 */
import { makeRequestQuery } from './makeRequestQuery';
import { API_URL, USERS, order_ID } from './config';
import { $, userBasket, confirmShoppingCart } from './global';

/**
 * Generate URL API
 */
const POST_URL = `${API_URL._HOST + API_URL._DIR + API_URL._CATEGORY}/${API_URL._ORDER}`;
console.log(`POST_URL :${POST_URL}`);
/**
 * Select elements for DOM
 */
const familyName = $('.js-familyName');
const givenName = $('.js-givenName');
const email = $('.js-email');
const addressLine1 = $('.js-addressLine1');
const addressLevel1 = $('.js-addressLevel1');
const submitForm = $('.js-submitForm');

const validForm = () => {
  /**
     * Auto complete user information
     */
  familyName.value = USERS.lastName;
  givenName.value = USERS.firstName;
  email.value = USERS.email;
  addressLine1.value = USERS.address;
  addressLevel1.value = USERS.city;

  submitForm.addEventListener('click', event => {
    event.preventDefault();
    if (familyName.value !== USERS.lastName) {
      console.log('Votre Nom de famille ne correspond pas à notre base de données !');
    } else if (givenName.value !== USERS.firstName) {
      console.log('Votre prénom ne correspond pas à notre base de données !');
    } else if (email.value !== USERS.email) {
      console.log('Votre email ne correspond pas à notre base de données !');
    } else if (addressLine1.value !== USERS.address) {
      console.log('Votre adresse ne correspond pas à notre base de données !');
    } else if (addressLevel1.value !== USERS.city) {
      console.log('Le nom de votre ville ne correspond pas à notre base de données !');
    } else {
      console.log("Tous c'est bien passée");
      confirmShoppingCart.push([order_ID, USERS.firstName, USERS.lastName, userBasket]);
      // userBasket.clear();
      if (localStorage.getItem('confirmShoppingCart', JSON.stringify(confirmShoppingCart)) !== null) {
        localStorage.setItem('confirmShoppingCart', JSON.stringify(confirmShoppingCart));
      }
      if (localStorage.getItem('userBasket', JSON.stringify(userBasket)) !== null) {
        localStorage.setItem('userBasket', JSON.stringify(userBasket));
      }
    }
    window.setTimeout(function() {
      window.location = 'confirmation.html';
    }, 2000);
  });
};
const createOrder = () => {
  // Request XHR
  const promise = makeRequestQuery('POST', POST_URL);
  promise.then(data => {
    console.log(`data 'POST' ? ${data}`);
    // TODO request POST
  });
  promise.catch(() => {
    // TODO throw new Error(err); or
    // TODO console.error(`Page error validFormJS : ${JSON.stringify(err)}`);
  });
};

/**
 * Export modules
 */
export { validForm, createOrder };
