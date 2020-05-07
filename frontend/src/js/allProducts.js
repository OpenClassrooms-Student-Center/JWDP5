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
import { makeRequestQuery } from './makeRequestQuery';
import { API_URL } from './config';
import { $ } from './global';

/**
 * Generate URL API
 */
const GET_URL = API_URL._HOST + API_URL._DIR + API_URL._CATEGORY;

/**
 * Select elements for the DOM
 */
const items = $('.js-allArticlesByCategory');

/**
 * Dynamic management for get all articles
 */
const getAllArticlesData = async () => {
  try {
    const data = await makeRequestQuery('GET', GET_URL);
    for (let i = 0; i < data.length; i += 1) {
      items.innerHTML += `<li class="articles__lists--item cards__item">
      <div class="cards__item__thumb">
        <img class="cards__item__thumb--img" src="${data[i].imageUrl}" alt="Appareil photo vintage ${data[i].name}" width="450" height="300">
      </div>
      <div class="cards__item__body">
        <h3 class="cards__item__body--title">Appareil photo vintage ${data[i].name}</h3>
        <p class="cards__item__body--name"><strong>Marque : </strong>${data[i].name}</p>
        <p class="cards__item__body--lenses"><strong>Lentilles : </strong>${data[i].lenses.join(' – ')}</p>
        <P class="cards__item__body--description"><strong>Description : </strong>${data[i].description.substr(0, 50)}...</P>
        <p class="cards__item__body--price"><strong>Prix : </strong>${data[i].price / 100}€</p>
        <div class="cards__item--button">
        <a class="btn" href="produit.html?id=${data[i]._id}" aria-label="Sélectionner l’appareil photo vintage ${data[i].name}">Sélectionner</a>
        </a>
      </div>
      </div>
    </li>`;
    }
  } catch(err) {
    // TODO throw new Error(err); or
    // TODO console.error(`Page error allProductsJS : ${JSON.stringify(err)}`);
  }
};

/**
 * Export modules
 */
export { getAllArticlesData };
