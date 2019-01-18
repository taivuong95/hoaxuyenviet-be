const router = require("express").Router(),
  jwt = require("../utils/authentication");

let userModel = require("../models/userModel");

// Login
router.post("/adminLogin", (req, res) => {
  let user = new userModel();
  userModel.findById(req.body.userphone, async (err, data) => {
    if (err) {
      res.statusCode(403);
    } else {
      if (
        await user.validatePassword(
          req.body.password,
          data.userPermission.password
        )
      ) {
        data = data.toJSON();
        data.userPermission.password = "";
        const token = jwt.createToken(data);
        res.json({
          userInfo: data,
          token
        });
      }
    }
  });
});

module.exports = router;
