const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require("../utils/authentication");

let cartModel = require("../models/cartModel");

// Create new cart
router.post("/cart", jwt.verifyToken, (req, res) => {
  cartModel.create(req.body, (err, data) => {
    util.execFunction(err, actionName.CREATED, res);
  });
});

router.get("/cart/:userId", jwt.verifyToken, (req, res) => {
  cartModel
    .findOne(
      { userInfo: req.params.userId },
      { createdAt: 0, updatedAt: 0, _id: 0 },
      (err, data) => {
        util.execFunction(err, data, res);
      }
    )
    .populate("userInfo", {
      _id: 0,
      userPermission: 0,
      createdAt: 0,
      updatedAt: 0
    });
});

module.exports = router;
