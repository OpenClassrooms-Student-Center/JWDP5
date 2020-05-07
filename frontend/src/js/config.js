/**
 * Const URL ID
 */
const a = window.location.search;
const b = new URLSearchParams(a);
const ID_URL = b.get('id');

/**
 * Object Category API
 */
const categories = {
  cat1: 'cameras',
  cat2: 'teddies',
  cat3: 'furniture',
};

/**
 * Object Users
 */
const USERS = {
  firstName: 'Alain',
  lastName: 'Dupont',
  address: '20 rue Henry Durant',
  city: 'Lyon',
  email: 'alain-dupont@gmail.com',
};

/**
 * Generate URL API
 */
const API_URL = {
  _HOST: 'http://localhost:3000/',
  _DIR: 'api/',
  _CATEGORY: categories.cat1,
  _ID: ID_URL,
  _ORDER: 'order',
};

const order_ID = Math.round(Math.random() * 9654782366987);

/**
 * Export module
 */
export { API_URL, USERS, order_ID };
