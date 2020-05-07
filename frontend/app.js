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
import './src/sass/app.scss';
import { getUserConnect, quantityBasket, getCurrentYear } from './src/js/allPages';
import { getAllArticlesData } from './src/js/allProducts';
import { getArticleByIdData } from './src/js/product';
import { allBasket } from './src/js/allBasket';
import { validForm } from './src/js/validForm';
import { orderPlaced } from './src/js/orderPlaced';

window.addEventListener('load', () => {
  // All Pages
  getUserConnect();
  quantityBasket();
  getCurrentYear();

  // Home Page
  getAllArticlesData();


  // Product Page
  getArticleByIdData();

  // Basket page
  allBasket();

  // Order Placed
  orderPlaced();

  // Valid user for form
  validForm();
});
