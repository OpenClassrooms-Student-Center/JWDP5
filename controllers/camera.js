const uuid = require('uuid/v1');
const Camera = require('../models/Camera');

exports.getAllCameras = (req, res, next) => {
  Camera.find().then(
    (cameras) => {
      res.status(200).json(cameras);
    }
  ).catch(
    (error) => {
      res.status(400).send(error);
    }
  );
};

exports.getOneCamera = (req, res, next) => {
  Camera.findById(req.params.id).then(
    (camera) => {
      if (!camera) {
        return res.status(404).send(new Error('Camera not found!'));
      }
      res.status(200).json(camera);
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
exports.orderCameras = (req, res, next) => {
  let queries = [];
  for (let productId of req.body.products) {
    const queryPromise = new Promise((resolve, reject) => {
      Camera.findById(productId).then(
        (camera) => {
          resolve(camera);
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
    (cameras) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        cameras: cameras,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(error);
    }
  );
};