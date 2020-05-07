
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
 * Import modules outside
 */
import { makeRequestQuery } from './makeRequestQuery';
import { API_URL } from './config';
import { $, confirmShoppingCart } from './global';

/**
 * Generate URL API
 */
const GET_URL = API_URL._HOST + API_URL._DIR + API_URL._CATEGORY;

/**
 * Select elements
 */
const orderInfo = $('.js-orderInfo');
const returnPageHome = $('.js-retourHome');

const orderPlaced = () => {
  const promise = makeRequestQuery('GET', GET_URL);
  promise.then(data => {
    if (orderInfo) {
      if (confirmShoppingCart !== null) {
        orderInfo.innerHTML = `<h2 class="modal__title">Votre commande a bien été validée</h2><p>Mr. <strong>${confirmShoppingCart[0][1]} ${confirmShoppingCart[0][2]}</strong>, voici votre numéro ID : <strong>${confirmShoppingCart[0][0]}</strong> de votre commande d'un prix total de : <strong>${/* EXEMPLE */ data.length /* TODO All Price*/}</strong>€.<br>Nous restons à votre disposition pour toutes vos réclamations.<br>Toute l'équipe vous remercie pour votre achat en espérant qu'il vous conviendra.</p>`;
      } else {
        orderInfo.innerHtml =
        '<h2 class="modal__title">Il y a un problème avec votre commande</h2><p><a href="./panier.html">Retour au panier</a></p>';
      }
    }
    if (returnPageHome) {
      returnPageHome.addEventListener('click', event => {
        event.preventDefault();
        localStorage.clear();
        window.setTimeout(function() {
          window.location = 'index.html';
        }, 2000);
      });
    }

  });
  promise.catch(() => {
    // console.error(`Page error orderPlacedJS : ${JSON.stringify(err)}`);
  });
};

/**
 * Export modules
 */
export { orderPlaced };
