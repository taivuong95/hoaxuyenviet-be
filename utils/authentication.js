const jwt = require("jsonwebtoken");

// create new Token
function createToken(userData) {
  return jwt.sign(userData, process.env.SECRETKEY);
}

// verify token for authenticated requests
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(req.token, process.env.SECRETKEY, (err, decodedData) => {
      if (err) {
        res.status(403).json(err);
      } else {
        req.userData = decodedData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken
};
