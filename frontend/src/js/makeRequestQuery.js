/* eslint-disable prefer-promise-reject-errors */
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
 * Get XHR request with promise <https://gomakethings.com/promise-based-xhr/>
 *
 * @param {String} URL Request URL
 */
var makeRequestQuery = function (...args) {

  // Create the XHR request
  const XHR = new XMLHttpRequest();

  // Return it as a Promise
  return new Promise(function (resolve, reject) {

    // Setup our listener to process completed requests
    XHR.onreadystatechange = function () {

      // Only run if the request is complete
      if (XHR.readyState !== 4) return;

      // Process the response
      if (XHR.status >= 200 && XHR.status < 300) {
        // If successful
        resolve(JSON.parse(XHR.response));
      } else {
        // If failed
        reject({
          status: XHR.status,
          statusText: XHR.statusText
        });
      }

    };

    // Setup our HTTP request
    XHR.open(...args, true);
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Send the request
    XHR.send();

  });
};
/* TODO const makeRequestQuery = (URL, method) =>
  return new Promise((resolve, reject) => {
    let done = false;
    // create an XHR object
    const XHR = new XMLHttpRequest();
    // listen for `onreadystatechange` event
    XHR.onreadystatechange = () => {
      // Only run if the request is complete
      if (XHR.readyState !== 4 && !done) {
        done = true;
      }
      // Process the response
      if (XHR.status >= 200 && XHR.status < 300) {
        // If successful
        resolve(JSON.parse(XHR.response));
      } else {
        // If failed
        reject({
          status: XHR.status,
          statusText: XHR.statusText,
        });
      }
    };
    // Setup our HTTP request
    XHR.open(method || 'GET', URL, true);
    XHR.setRequestHeader('Content-Type', 'application/json');
    // Send the request
    XHR.send();
  });*/

/**
 * Export modules
 */
export { makeRequestQuery };
