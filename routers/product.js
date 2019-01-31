const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require("../utils/authentication");

let productModel = require("../models/productModel");
const categoryPageOption =
  "images type form event color holiday productName price discount new sale hot ";

// Create new product
router.post("/product", jwt.verifyTokenAdmin, (req, res) => {
  productModel.create(req.body, (err, data) => {
    util.execFunction(err, actionName.CREATED, res);
  });
});

// Update product by id
router.patch("/product/:id", jwt.verifyTokenAdmin, (req, res) => {
  productModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  });
});

// Delete product by id
router.delete("/product/:id", jwt.verifyTokenAdmin, (req, res) => {
  productModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  });
});

// Get product by id
router.get("/product/:id", (req, res) => {
  productModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  });
});

// Get product list
router.get("/productList", (req, res) => {
  if (req.query.page) {
    const condition = {};
    condition[req.query.of] = {
      $in: [req.query.by]
    };
    if (req.query.page === "category") {
      // get product list for category page by condition
      productModel
        .find(
          condition,
          categoryPageOption.replace(req.query.of, ""),
          (err, data) => {
            util.execFunction(err, data, res);
          }
        )
        .sort({
          updatedAt: -1
        });
    }
  } else {
    productModel
      .find((err, data) => {
        util.execFunction(err, data, res);
      })
      .sort({
        updatedAt: -1
      });
  }
});

// search product list by name
router.post("/productList/search", (req, res) => {
  productModel
    .find(
      {
        productName: {
          $regex: `${req.body.name.trim()}`,
          $options: "i"
        }
      },
      (err, data) => {
        util.execFunction(err, data, res);
      }
    )
    .sort({
      updatedAt: -1
    });
});

// Get Random products by type
router.get("/product/randomList/:type", (req, res) => {
  productModel
    .find(
      { type: { $in: req.params.type }, _id: { $ne: req.query.productId } },
      "productName images price discount new sale hot"
    )
    .sort({ updatedAt: -1 })
    .limit(6)
    .exec((err, data) => {
      util.execFunction(err, data, res);
    });
});

module.exports = router;
