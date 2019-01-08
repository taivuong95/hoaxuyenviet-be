const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let chargeOrder = (tokenId, data, res) => {
  console.log(tokenId);
  console.log(data);
  stripe.charges.create({
    amount: data.total,
    source: tokenId,
    currency: 'vnd'
  }).then((dt) => {
    res.json({
      data: dt
    })
  }).catch((err) => {
    console.log(err);
    res.json({
      err
    })
  })
}

module.exports = {
  chargeOrder
}