const uuid = require('uuid/v1');
const Teddy = require('../models/Teddy');

exports.getAllTeddies = (req, res, next) => {
  Teddy.find().then(
    (teddies) => {
      const mappedTeddies = teddies.map((teddy) => {
        teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
        return teddy;
      });
      res.status(200).json(mappedTeddies);
    }
  ).catch(
    (error) => {
      res.status(400).send(error);
    }
  );
};

exports.getOneTeddy = (req, res, next) => {
  Teddy.findById(req.params.id).then(
    (teddy) => {
      if (!teddy) {
        return res.status(404).send(new Error('Teddy not found!'));
      }
      teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
      res.status(200).json(teddy);
    }
  ).catch(
    (error) => {
      res.status(500).send(error);
    }
  )
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
exports.orderTeddies = (req, res, next) => {
  let queries = [];
  for (let productId of req.body.products) {
    const queryPromise = new Promise((resolve, reject) => {
      Teddy.findById(productId).then(
        (teddy) => {
          teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
          resolve(teddy);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (teddies) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        products: teddies,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(error);
    }
  );
};