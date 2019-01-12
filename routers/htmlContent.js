const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName");

let htmlContentModel = require("../models/htmlContentModel");

// Create or update html content
router.post("/htmlContent", (req, res) => {
  htmlContentModel.findById("htmlContent", (err, data) => {
    if (data) {
      htmlContentModel.updateOne(req.body, (err, data) => {
        util.execFunction(err, actionName.UPDATED, res);
      })
    } else {
      htmlContentModel.create(req.body, (err, data) => {
        util.execFunction(err, actionName.CREATED, res);
      })
    }
  });
});

// Get html content
router.get("/htmlContent", (req, res) => {
  htmlContentModel.findOne((err, data) => {
    util.execFunction(err, data, res);
  })
})

module.exports = router;