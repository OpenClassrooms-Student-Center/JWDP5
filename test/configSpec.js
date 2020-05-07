/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const assert = require('assert');

describe('Test for the config', function() {
  it('should be selected an element in the dom', function() {
    /**
     * Select an element in the dom
     *
     * @param {string} selector
     * @param {string} element
     */
    return (selectorElement = (selector, element) => {
      if (!element) {
        element = document;
      }
      return element.querySelector(selector);
    });
  });
  it('should be created an element in the dom', function() {
    /**
     * Build an element in the dom
     *
     * @param {string} create
     * @param {string} element
     */
    return (createElement = (create, element) => {
      if (!element) {
        element = document;
      }
      return element.createElement(create);
    });
  });
  it('Should even the basket in the storage of the browser', function() {
    /**
     * User basket Object
     *
     * @param {Object} userBasket
     */
    return (getLocalStorage = userBasket => {
      if (localStorage.getItem('userBasket')) {
        console.log('User basket and available in local browser storage');
      } else {
        // eslint-disable-next-line prefer-const
        let basketInit = [];
        localStorage.setItem('userBasket', JSON.stringify(basketInit));
      }
    });
  });
});
