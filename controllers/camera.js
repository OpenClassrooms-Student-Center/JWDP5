const uuid = require('uuid/v1');
const allCameras = require('../json/cameras');

exports.getAllCameras = (req, res, next) => {
  res.status(200).json(allCameras.map((camera) => {
    if (!camera.imageUrl.startsWith('http')) {
      camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
    }

    return camera;
  }));
};

exports.getOneCamera = (req, res, next) => {
  const camera = allCameras.find(camera => camera._id === req.params.id);
  if (!camera) {
    return res.status(404).send(new Error('Camera not found!'));
  }

  if (!camera.imageUrl.startsWith('http')) {
    camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
  }

  return res.status(200).json(camera);
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
exports.orderCameras = (req, res, next) => {
  if (!req.body.contact ||
      !req.body.contact.firstName ||
      !req.body.contact.lastName ||
      !req.body.contact.address ||
      !req.body.contact.city ||
      !req.body.contact.email ||
      !req.body.products) {
    return res.status(400).send(new Error('Bad request!'));
  }

  const cameras = [];
  for (let productId of req.body.products) {
    const camerasFiltered = allCameras.filter(camera => camera._id === productId);
    if (camerasFiltered.length === 0) {
      return res.status(500).json(new Error('Camera not found: ' + productId));
    }

    if (!camerasFiltered[0].imageUrl.startsWith('http')) {
      camerasFiltered[0].imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camerasFiltered[0].imageUrl;
    }
    cameras.push(camerasFiltered[0]);
  }

  return res.status(201).json({
    contact: req.body.contact,
    products: cameras,
    orderId: uuid()
  });
};
