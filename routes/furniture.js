const express = require('express');
const router = express.Router();

const furnitureCtrl = require('../controllers/furniture');

router.get('/', furnitureCtrl.getAllFurniture);
router.get('/:id', furnitureCtrl.getOneFurniture);
router.post('/order', furnitureCtrl.orderFurniture);

module.exports = router;