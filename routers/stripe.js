const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  router = require("express").Router();

// charge order
let chargeOrder = (tokenId, data, res) => {
  console.log(tokenId);
  console.log(data);
  stripe.charges
    .create({
      amount: data.total,
      source: tokenId,
      currency: "vnd"
    })
    .then(dt => {
      console.log(dt);
      res.json({
        data: dt
      });
    })
    .catch(err => {
      console.log(err);
      res.json({
        err
      });
    });
};

// charge to stripe
router.post("/checkout/charge", (req, res) => {
  chargeOrder(req.body.stripeTokenId, req.body.data, res);
});

module.exports = router;
