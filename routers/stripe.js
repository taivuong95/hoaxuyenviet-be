const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  util = require('../utils/utilities');
router = require("express").Router();

// charge order
let chargeOrder = (tokenId, data, res) => {
  stripe.charges
    .create({
      amount: data.total,
      source: tokenId,
      currency: "vnd"
    }, function (err, charge) {
      console.log(err);
      console.log(charge);
      if (err) {
        util.errFunction(
          res,
          400,
          "Lỗi Thanh Toán! Vui Lòng Nhập Lại Hoặc Chọn Hình Thức Thanh Toán Khác!",
          "009"
        );
      } else {
        util.execFunction(err, charge, res);
      }
    });
};

// charge to stripe
router.post("/checkout/charge", (req, res) => {
  chargeOrder(req.body.stripeTokenId, req.body.data, res);
});

module.exports = router;