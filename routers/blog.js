const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require("../utils/authentication");

let blogModel = require("../models/blogModel");

// Create new cart
router.post("/blog", jwt.verifyTokenAdmin, (req, res) => {
  blogModel.create(req.body, (err, data) => {
    if (err && err.code === 11000) {
      util.errFunction(
        res,
        400,
        "Mã Blog đã tồn tại! Vui Lòng nhập lại!",
        "006"
      );
    } else {
      util.execFunction(err, actionName.CREATED, res);
    }
  });
});

router.patch("/blog/:id", jwt.verifyTokenAdmin, (req, res) => {
  blogModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  });
});

router.delete("/blog/:id", jwt.verifyTokenAdmin, (req, res) => {
  blogModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  });
});

router.get("/blog/:id", (req, res) => {
  blogModel.findOne(
    {
      _id: req.params.id
    },
    (err, data) => {
      util.execFunction(err, data, res);
    }
  );
});

router.get("/blogs", (req, res) => {
  blogModel
    .find((err, data) => {
      util.execFunction(err, data, res);
    })
    .sort({
      updatedAt: -1
    });
});

module.exports = router;
