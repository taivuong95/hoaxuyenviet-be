const router = require("express").Router(),
  util = require("../utils/utilities"),
  actionName = require("../utils/actionName"),
  jwt = require("../utils/authentication");

let userModel = require("../models/userModel");

// Create admin
router.post("/user/createHoaXuyenVietAdmin", async (req, res) => {
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
  user.userPermission.role = "CUSTOMER";
  user.userPermission.password = await user.generateHash(
    user.userPermission.password
  );
  userModel.create(user, (err, data) => {
    if (err && err.code === 11000) {
      util.errFunction(
        res,
        400,
        "Số Điện Thoại đã tồn tại! Vui Lòng nhập lại!",
        "006"
      );
    } else {
      data.userPermission.password = undefined;
      util.execFunction(err, data, res);
    }
  });
});

// Update user by id
router.patch("/user/:id", jwt.verifyToken, (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    util.execFunction(err, actionName.UPDATED, res);
  });
});

// Delete user by id
router.delete("/user/:id", jwt.verifyTokenAdmin, (req, res) => {
  userModel.findByIdAndDelete(req.params.id, (err, data) => {
    util.execFunction(err, actionName.DELETED, res);
  });
});

// Get user/ by id
router.get("/user/:id", jwt.verifyToken, (req, res) => {
  userModel.findById(
    req.params.id,
    {
      "userPermission.password": 0,
      createdAt: 0,
      updatedAt: 0
    },
    (err, data) => {
      util.execFunction(err, data, res);
    }
  );
});

// Get user list
router.get("/userList", jwt.verifyTokenAdmin, (req, res) => {
  userModel
    .find((err, data) => {
      util.execFunction(err, data, res);
    })
    .select({
      "userPermission.password": 0
    })
    .sort({
      updatedAt: -1
    });
});

// change password
router.post("/resetPWD", (req, res) => {
  let user = new userModel();
  userModel.findById(
    req.body.userPhone,
    {
      createdAt: 0,
      updatedAt: 0
    },
    async (err, data) => {
      if (err || !data) {
        res.status(403).json(err);
      } else {
        data = data.toJSON();
        if (
          await user
            .validatePassword(req.body.resetLink, data.userPermission.resetLink)
            .catch(err =>
              res.status(403).json({
                message:
                  "Không Đúng Tài Khoản Hoặc Đường Dẫn Đặt Lại Mật Khẩu Không Đúng. Vui Lòng Kiểm Tra Hoặc Thao Tác Lại!",
                code: "010"
              })
            )
        ) {
          data.userPermission.password = await user.generateHash(
            req.body.password
          );
          data.userPermission.resetLink = null;
          userModel.findByIdAndUpdate(req.body.userPhone, data, (err, dt) => {
            util.execFunction(err, actionName.UPDATED, res);
          });
        } else {
          res.status(403).json({
            message:
              "Không Đúng Tài Khoản Hoặc Đường Dẫn Đặt Lại Mật Khẩu Không Đúng. Vui Lòng Kiểm Tra Hoặc Thao Tác Lại!",
            code: "010"
          });
        }
      }
    }
  );
});

module.exports = router;
