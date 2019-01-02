const router = require('express').Router(),
  util = require('../utils/utilities'),
  actionName = require('../utils/actionName');

let productModel = require('../models/productModel');


// Create new product
router.post('/product', (req, res) => {
  productModel.create(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Update product by id
router.patch('/product/:id', (req, res) => {
  productModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  })
})

// Delete product by id
router.delete('/product:id', (req, res) => {
  productModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  })
})

// Get product by id
router.get('/product:id', (req, res) => {
  productModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get product list
router.get('/productList', (req, res) => {
  productModel.find((err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get product by conditions
router.get('/product/searchByFilter', (req, res) => {
  productModel.find(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})


module.exports = router;