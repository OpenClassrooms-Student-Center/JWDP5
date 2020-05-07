/*
	Name : orinoco
	Create : 2020/04/05
	Version : 1.0.0
	Author : François, Joël Lesenne
	Site : <https://ocr-dw.s3.eu-west-3.amazonaws.com/orinoco/index.html>
	Depot : <https://github.com/joellesenne/orinoco>
	Licence : MIT <https://mit-license.org/>
*/

/**
 * Select an element in the dom
 *
 * @param {string} selector
 * @param {string} element
 */
const selectorElement = (selector, element) => {
  if (!element) {
    element = document;
  }
  return element.querySelector(selector);
};

/**
 * Build an element in the dom
 *
 * @param {string} create
 * @param {string} element
 */
const createElement = (create, element) => {
  if (!element) {
    element = document;
  }
  return element.createElement(create);
};

/**
 * Define function to create an element
 *
 * @param {string} tag
 * @param {string} text
 * @param {Object} classNames
 */
/* TODO const createNewElement = (tag, text, classNames = []) => {
  const el = document.createElement(tag);
  el.textContent = text;

  classNames.forEach(classNames => {
    el.classList.add(classNames);
  });
}; */

const $ = (...args) => document.querySelector(...args);
const $$ = (...args) => document.createElement(...args);

/**
 * User basket Init Object
 *
 * @param {Object} userBasket
 */
if (localStorage.getItem('userBasket')) {
  console.log('User basket init and available in local browser storage');
} else {
  const userBasketInit = [];
  localStorage.setItem('userBasket', JSON.stringify(userBasketInit));
}

/**
 * Confirm shopping cart
 *
 * @param {Object} confirmShoppingCart
 */
if (localStorage.getItem('confirmShoppingCart')) {
  console.log('Confirm shopping cart and available in local browser storage');
} else {
  const confirmShoppingCartInit = [];
  localStorage.setItem('confirmShoppingCart', JSON.stringify(confirmShoppingCartInit));
}

/**
 * Initialize local Storage
 */
const userBasket = JSON.parse(localStorage.getItem('userBasket'));
const confirmShoppingCart = JSON.parse(localStorage.getItem('confirmShoppingCart'));

/**
 * Export modules
 */
export { selectorElement, $, $$, createElement, userBasket, confirmShoppingCart };
