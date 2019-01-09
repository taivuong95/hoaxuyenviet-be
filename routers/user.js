const router = require('express').Router(),
  util = require('../utils/utilities');

let userModel = require('../models/userModel');

// Create order
router.post('/user', (req, res) => {
  userModel.create(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Update order by id
router.patch('/user/:id', (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  })
})

// Delete order by id
router.delete('/user:id', (req, res) => {
  userModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  })
})

// Get order/ by id
router.get('/user/:id', (req, res) => {
  userModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get order/ list
router.get('/user/List', (req, res) => {
  userModel.find((err, data) => {
    util.execFunction(err, data, res);
  })
})

// Get order/ by conditions
router.get('/user/searchByFilter', (req, res) => {
  userModel.find(req.body, (err, data) => {
    util.execFunction(err, data, res);
  })
})

module.exports = router;