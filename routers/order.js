const router = require('express').Router,
  util = require('../utils/utilities');

let orderModel = require('../models/orderModel');

// Create order
router.post('/order', (req, res) => {
  orderModel.create(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Update order by id
router.patch('/order/:id', (req, res) => {
  orderModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  })
})

// Delete order by id
router.delete('/order:id', (req, res) => {
  orderModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  })
})

// Get order/ by id
router.get('/order/:id', (req, res) => {
  orderModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get order/ list
router.get('/order/List', (req, res) => {
  orderModel.find((err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get order/ by conditions
router.get('/order//searchByFilter', (req, res) => {
  orderModel.find(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})