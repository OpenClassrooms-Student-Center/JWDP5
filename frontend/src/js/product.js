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
import { API_URL } from './config';
import { $, $$, userBasket } from './global';

/**
 * Generate URL API
 */
const GET_URL = `${API_URL._HOST + API_URL._DIR + API_URL._CATEGORY}/${API_URL._ID}`;

/**
 * Select elements for the DOM
 */
const imgProduct = $('.js-imgProduct');
const titleProduct = $('.js-titleProduct');
const markProduct = $('.js-markProduct');
const lensesProduct = $('.js-lensesProduct');
const descriptionProduct = $('.js-descriptionProduct');
const priceProduct = $('.js-priceProduct');
const selectOptionProduct = $('.js-selectOptionProduct');
const changeOption = $('.js-changeOption');
const resultIsActive = $('.js-resultIsActive');
const resultOption = $('.js-resultOption');
const activeButtonAdd = $('.js-activeButtonAdd');
const activeButtonDelete = $('.js-activeButtonDelete');
const activeButtonValid = $('.js-activeButtonValid');
const addBasket = $('.js-addBasket');
const deleteBasket = $('.js-deleteBasket');
const quantityIsActive = $('.js-quantityIsActive');
const quantityMessage = $('.js-quantityMessage');
const quantityBasket = $('.js-quantityBasket');

/**
 * Dynamic management for get article by ID
 */
const getArticleByIdData = () => {
  // Request XHR
  const promise = makeRequestQuery('GET', GET_URL);
  promise.then(data => {
    console.log(`data getArticleByIdData() : ${data}`);
    imgProduct.setAttribute('src', `${data.imageUrl}`);
    imgProduct.setAttribute('alt', `Appareil photo vintage ${data.name}`);
    imgProduct.setAttribute('width', '450');
    imgProduct.setAttribute('height', '300');
    imgProduct.setAttribute('loading', 'lazy');
    imgProduct.style.display = 'block';
    titleProduct.innerHTML = data.name;
    markProduct.innerHTML += data.name;
    lensesProduct.innerHTML += data.lenses.join(' – ');
    descriptionProduct.innerHTML += data.description;
    priceProduct.innerHTML += `${data.price / 100}€`;
    for (let i = 0; i < data.lenses.length; i += 1) {
      const option = $$('option');
      option.setAttribute('class', 'card__form__select--option js-selectOption');
      option.value = data.lenses[i];
      option.innerHTML = data.lenses[i];
      selectOptionProduct.appendChild(option);
    }
  });
  promise.then(() => {
    /**
     * Change select option
     */
    if (changeOption) {
      changeOption.addEventListener('change', event => {
        event.preventDefault();
        resultIsActive.style.display = 'block';
        resultOption.textContent = event.target.value;
        activeButtonAdd.style.display = 'inline-block';
      });
    }
  });
  /**
   * Add product in basket
   */
  promise.then(data => {
    addBasket.addEventListener('click', event => {
      event.preventDefault();
      quantityIsActive.style.display = 'block';
      quantityMessage.textContent = Number(quantityMessage.textContent) + 1;
      quantityBasket.textContent = Number(quantityBasket.textContent) + 1;

      if (quantityMessage.textContent <= 1) {
        if (!resultOption.textContent) {
          console.log(resultOption.textContent = 'Boîtier nu');
        } else {
          console.log(resultOption.textContent);
        }
        userBasket.push([data._id, quantityMessage.textContent, resultOption.textContent]);
      } else {
        userBasket.push([data._id, '1', resultOption.textContent]);
      }

      if (localStorage.getItem('userBasket', JSON.stringify(userBasket)) !== null) {
        localStorage.setItem('userBasket', JSON.stringify(userBasket));
      }

      activeButtonDelete.style.display = 'inline-block';
      activeButtonValid.style.display = 'block';
    });
  });
  /**
   * Delete product in basket
   */
  promise.then(data => {
    deleteBasket.addEventListener('click', event => {
      event.preventDefault();
      quantityMessage.textContent = Number(quantityMessage.textContent) - 1;
      quantityBasket.textContent = Number(quantityBasket.textContent) - 1;

      // console.log(quantityMessage.textContent);
      if (Number(quantityMessage.textContent) >= 1) {
        userBasket.pop(data);
        localStorage.setItem('userBasket', JSON.stringify(userBasket));
      } else {
        activeButtonDelete.style.display = 'none';
        quantityIsActive.style.display = 'none';
        activeButtonValid.style.display = 'none';
      }
    });
  });
  promise.catch(() => {
    // TODO throw new Error(err); or
    // TODO console.error(`Page error productJS : ${JSON.stringify(err)}`);
  });
};

/**
 * Export modules
 */
export { getArticleByIdData };
