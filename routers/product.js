const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require('../utils/authentication');;

let productModel = require("../models/productModel");
const categoryPageOption = 'images type form event color holiday productName price discount new sale hot ';

// Create new product
router.post("/product", jwt.verifyToken, (req, res) => {
  if (req.userData.userPermission.role === 'ADMIN') {
    productModel.create(req.body, (err, data) => {
      util.execFunction(err, actionName.CREATED, res);
    })
  } else {
    util.errFunction(res, 403, 'Bạn không có quyền thay đổi! Vui lòng liên hệ người quản trị!', 001)
  }

});

// Update product by id
router.patch("/product/:id", jwt.verifyToken, (req, res) => {
  if (req.userData.userPermission.role === 'ADMIN') {
    productModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      util.execFunction(err, actionName.UPDATED, res);
    })
  } else {
    util.errFunction(res, 403, 'Bạn không có quyền thay đổi! Vui lòng liên hệ người quản trị!', 001);
  }

})

// Delete product by id
router.delete('/product/:id', jwt.verifyToken, (req, res) => {
  if (req.userData.userPermission.role === 'ADMIN') {
    productModel.findByIdAndDelete(req.params.id, (err, data) => {
      util.execFunction(err, actionName.DELETED, res);
    })
  } else {
    util.errFunction(res, 403, 'Bạn không có quyền thay đổi! Vui lòng liên hệ người quản trị!', 001);

  }
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
    }).sort({
      updatedAt: -1
    })
  }
})


module.exports = router;