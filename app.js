if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
require('./utils/db');
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  htmlContentRouter = require('./routers/htmlContent'),
  productRouter = require('./routers/product'),
  orderRouter = require('./routers/order'),
  userRouter = require('./routers/user'),
  stripeRouter = require('./routers/stripe'),
  emailRouter = require('./routers/email');

const app = express();

app.use(express.static(path.join(__dirname + '/clientside/build')));
// app.use('/assets/js', express.static(path.join(__dirname + '/clientside/build/assets/js')));
// app.use('/assets/js/themejs', express.static(path.join(__dirname + '/clientside/build/assets/js/themejs')));
// app.use('/assets/js/jquery', express.static(path.join(__dirname + '/clientside/build/assets/js/jquery')));
// app.use('/assets/js/jquery/dateimepicker', express.static(path.join(__dirname + '/clientside/build/assets/js/jquery/dateimepicker')));
// app.use('/assets/js/bootstrap/js', express.static(path.join(__dirname + '/clientside/build/assets/js/bootstrap/js')));
// app.use('/assets/js/lightbox', express.static(path.join(__dirname + '/clientside/build/assets/js/lightbox')));
// app.use('/static/js', express.static(path.join(__dirname + '/clientside/build/static/js')));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb'
}));

app.use('/', htmlContentRouter);
app.use('/', productRouter);
app.use('/', orderRouter);
app.use('/', userRouter);
app.use('/', stripeRouter);
app.use('/', emailRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/clientside/build/index.html"));
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SERVER START: ' + PORT);
})