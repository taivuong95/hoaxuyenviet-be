const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName");

let userModel = require("../models/userModel");

// Create admin
router.post("/user/createAdmin", async (req, res) => {
  let user = new userModel(req.body);
  user.userPermission.role = "ADMIN";
  user.userPermission.password = await user.generateHash(
    user.userPermission.password
  );
  userModel.create(user, (err, data) => {
    util.execFunction(err, actionName.CREATED, res);
  });
});

// Create user
router.post("/user/createUser", async (req, res) => {
  let user = new userModel(req.body);
  user.userPermission.password = await user.generateHash(
    user.userPermission.password
  );
  req.body.userPermission.role = "CUSTOMER";
  userModel.create(req.body, (err, data) => {
    util.execFunction(err, actionName.CREATED, res);
  });
});

// Update user by id
router.patch("/user/:id", (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  });
});

// Delete user by id
router.delete("/user:id", (req, res) => {
  userModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  });
});

// Get user/ by id
router.get("/user/:id", (req, res) => {
  userModel.findById(req.params.id, (err, data) => {
    util.execFunction(err, data, res);
  });
});

// Get user list
router.get("/user/List", (req, res) => {
  userModel.find((err, data) => {
    util.execFunction(err, data, res);
  });
});

// Get user by conditions
router.get("/user/searchByFilter", (req, res) => {
  userModel.find(req.body, (err, data) => {
    util.execFunction(err, data, res);
  });
});

module.exports = router;