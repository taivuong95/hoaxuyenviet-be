const router = require('express').Router(),
  util = require('../utils/utilities'),
  actionName = require('../utils/actionName');

let productModel = require('../models/productModel');

const categoryPageOption = 'images type form event color holiday productName price discount new sale hot ';

// Create new product
router.post('/product', (req, res) => {
  productModel.create(req.body, (err, data) => {
    util.execFunction(err, actionName.CREATED, res);
  })
})

// Update product by id
router.patch('/product/:id', (req, res) => {
  productModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  })
})

// Delete product by id
router.delete('/product/:id', (req, res) => {
  productModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  })
})

// Get product by id
router.get('/product/:id', (req, res) => {
  productModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get product list
router.get('/productList', (req, res) => {
  if (req.query.page) {
    const condition = {};
    condition[req.query.of] = {
      "$in": [req.query.by]
    }
    if (req.query.page === 'category') {
      // get product list for category page by condition
      productModel.find(condition, categoryPageOption.replace(req.query.of, ''), (err, data) => {
        util.execFunction(err, data, res);
      })
    }
  } else {
    productModel.find((err, data) => {
      util.execFunction(err, data, res);
    })
  }
})


module.exports = router;