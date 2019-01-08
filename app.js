if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./utils/db');
const app = require('express')(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  htmlContentRouter = require('./routers/htmlContent'),
  productRouter = require('./routers/product'),
  stripe = require('./utils/stripe');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb'
}));
app.use(cors());

app.use('/', htmlContentRouter);
app.use('/', productRouter);

//test stripe
app.post('/charge', (req, res) => {
  stripe.chargeOrder(req.body.stripeTokenId, req.body.data, res);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SERVER START: ' + PORT);
})