const router = require("express").Router(),
  jwt = require("../utils/authentication");

let userModel = require("../models/userModel");

// Login
router.post("/adminLogin", (req, res) => {
  let user = new userModel();
  userModel.findById(req.body.userphone, async (err, data) => {
    if (err || !data) {
      res.status(403).json(err);
    } else {
      data = data.toJSON();
      if (
        await user.validatePassword(
          req.body.password,
          data.userPermission.password
        )
      ) {
        const token = jwt.createToken(data);
        res.json({
          userPhone: data._id,
          auth: true,
          role: data.userPermission.role,
          token
        });
      }
    }
  });
});

module.exports = router;
