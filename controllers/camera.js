const uuid = require('uuid/v1');
const Camera = require('../models/Camera');

exports.getAllCameras = (req, res, next) => {
  Camera.find().then(
    (cameras) => {
      const mappedCameras = cameras.map((camera) => {
        camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
        return camera;
      });
      res.status(200).json(mappedCameras);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
};

exports.getOneCamera = (req, res, next) => {
  Camera.findById(req.params.id).then(
    (camera) => {
      if (!camera) {
        return res.status(404).send(new Error('Camera not found!'));
      }
      camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
      res.status(200).json(camera);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
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
  let queries = [];
  for (let productId of req.body.products) {
    const queryPromise = new Promise((resolve, reject) => {
      Camera.findById(productId).then(
        (camera) => {
          if (!camera) {
            reject('Camera not found: ' + productId);
          }
          camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
          resolve(camera);
        }
      ).catch(
        () => {
          reject('Database error!');
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (cameras) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        products: cameras,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(new Error(error));
    }
  );
};
