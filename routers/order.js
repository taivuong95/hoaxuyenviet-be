const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require("../utils/authentication");

let orderModel = require("../models/orderModel");

// Create new order
router.post("/order", (req, res) => {
  orderModel.create(req.body, (err, data) => {
    if (err) {
      util.errFunction(
        res,
        400,
        "Lỗi Đặt Hàng! Vui Lòng Đặt Lại Hoặc Liên Hệ Chủ Shop Nếu Đã Thanh Toán!",
        "006"
      );
    } else {
      util.execFunction(err, actionName.CREATED, res);
    }
  });
});

// Update order by id
router.patch("/order/:id", jwt.verifyTokenAdmin, (req, res) => {
  orderModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  });
});

// Delete order by id
router.delete("/order/:id", jwt.verifyTokenAdmin, (req, res) => {
  orderModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  });
});

// Get order/ by id
router.get("/order/:id", jwt.verifyToken, (req, res) => {
  orderModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  });
});

// Get order/ list
router.get("/orderList", jwt.verifyTokenAdmin, (req, res) => {
  orderModel
    .find((err, data) => {
      util.execFunction(err, data, res);
    })
    .sort({
      updatedAt: -1
    });
});

//get order by userphone
router.get("/orderList/:userId", jwt.verifyToken, (req, res) => {
  orderModel.find({
      "customerInfo.phone": req.params.userId
    },
    (err, data) => {
      util.execFunction(err, data, res);
    }
  ).sort({
    updatedAt: -1
  });
});

module.exports = router;