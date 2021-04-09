const uuid = require('uuid/v1');
const allFurnitures = require('../json/furnitures');

exports.getAllFurniture = (req, res, next) => {
  res.status(200).json(allFurnitures.map((furniture) => {
    if (!furniture.imageUrl.startsWith('http')) {
      furniture.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + furniture.imageUrl;
    }

    return furniture;
  }));
};

exports.getOneFurniture = (req, res, next) => {
  const furniture = allFurnitures.find(furniture => furniture._id === req.params.id);
  if (!furniture) {
    return res.status(404).send(new Error('Furniture not found!'));
  }

  if (!furniture.imageUrl.startsWith('http')) {
    furniture.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + furniture.imageUrl;
  }

  return res.status(200).json(furniture);
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
exports.orderFurniture = (req, res, next) => {
  if (!req.body.contact ||
    !req.body.contact.firstName ||
    !req.body.contact.lastName ||
    !req.body.contact.address ||
    !req.body.contact.city ||
    !req.body.contact.email ||
    !req.body.products) {
  return res.status(400).send(new Error('Bad request!'));
  }

  const furnitures = [];
  for (let productId of req.body.products) {
    const furniture = allFurnitures.find(furniture => furniture._id === productId);
    if (furniture === 'undefined') {
      return res.status(500).json(new Error('Furniture not found: ' + productId));
    }

    if (!furniture.imageUrl.startsWith('http')) {
      furniture.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + furniture.imageUrl;
    }
    furnitures.push(furniture);
  }

  return res.status(201).json({
    contact: req.body.contact,
    products: furnitures,
    orderId: uuid()
  });
};
