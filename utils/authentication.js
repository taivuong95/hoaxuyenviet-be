const jwt = require("jsonwebtoken");
const util = require("../utils/utilities");

// create new Token
function createToken(userData) {
  if (userData.userPermission.role === "ADMIN") {
    return jwt.sign(userData, process.env.SECRETKEY, {
      expiresIn: "3 days"
    });
  } else {
    return jwt.sign(userData, process.env.SECRETKEY);
  }
}

// verify token for authenticated requests
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decodedData) => {
      if (err) {
        util.errFunction(
          res,
          403,
          "Không có quyền hoặc đã hết thời gian đăng nhập! Vui lòng đăng nhập lại.",
          "002"
        );
      } else {
        req.userData = decodedData;
        next();
      }
    });
  } else {
    util.errFunction(
      res,
      403,
      "Không có quyền hoặc đã hết thời gian đăng nhập! Vui lòng đăng nhập lại.",
      "002"
    );
  }
}

// verify token for authenticated requests
function verifyTokenAdmin(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, decodedData) => {
      if (!decodedData || decodedData.userPermission.role !== "ADMIN" || err) {
        util.errFunction(
          res,
          403,
          "Không có quyền hoặc đã hết thời gian đăng nhập! Vui lòng đăng nhập lại.",
          "002"
        );
      } else {
        req.userData = decodedData;
        next();
      }
    });
  } else {
    util.errFunction(
      res,
      403,
      "Không có quyền hoặc đã hết thời gian đăng nhập! Vui lòng đăng nhập lại.",
      "002"
    );
  }
}

module.exports = {
  createToken,
  verifyToken,
  verifyTokenAdmin
};