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
 * Load modules
 */
import { USERS } from './config';
import { $, userBasket } from './global';

/**
 * Select elements in the DOM
 */
const quantity = $('.js-quantityBasket');
const userConnect = $('.js-userConnect');

/**
 * Dynamic management for the quantity basket
 */
const quantityBasket = async () => {
  const data = await userBasket;
  if (data.length >= 1) {
    quantity.innerHTML = data.length;
  } else {
    quantity.innerHTML = '';
  }
};

/**
 * Dynamic management for the current year
 */
const getCurrentYear = async () => {
  const date = new Date().getFullYear('Y');
  const dateFullYear = $('.js-currentYear');
  // eslint-disable-next-line no-return-assign
  await (dateFullYear.textContent = date);
};

/**
 * Dynamic management for the users
 */
const getUserConnect = () => {
  if (userConnect !== null) {
    userConnect.textContent = `${USERS.firstName} ${USERS.lastName}`;
  } else {
    userConnect.textContent = 'Connectez-vous';
  }
};

/**
 * Export modules
 */
export { quantityBasket, getCurrentYear, getUserConnect };
