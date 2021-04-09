const uuid = require('uuid/v1');
const allTeddies = require('../json/teddies');

exports.getAllTeddies = (req, res, next) => {
  res.status(200).json(allTeddies.map((teddy) => {
    if (!teddy.imageUrl.startsWith('http')) {
      teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
    }

    return teddy;
  }));
};

exports.getOneTeddy = (req, res, next) => {
  const teddy = allTeddies.find(teddy => teddy._id === req.params.id);
  if (!teddy) {
    return res.status(404).send(new Error('Teddy not found!'));
  }

  if (!teddy.imageUrl.startsWith('http')) {
    teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
  }

  return res.status(200).json(teddy);
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
  if (!req.body.contact ||
    !req.body.contact.firstName ||
    !req.body.contact.lastName ||
    !req.body.contact.address ||
    !req.body.contact.city ||
    !req.body.contact.email ||
    !req.body.products) {
  return res.status(400).send(new Error('Bad request!'));
  }

  const teddies = [];
  for (let productId of req.body.products) {
    const teddy = allTeddies.find(teddy => teddy._id === productId);
    if (teddy === 'undefined') {
      return res.status(500).json(new Error('Teddy not found: ' + productId));
    }

    if (!teddy.imageUrl.startsWith('http')) {
      teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
    }
    teddies.push(teddy);
  }

  return res.status(201).json({
    contact: req.body.contact,
    products: teddies,
    orderId: uuid()
  });
};
