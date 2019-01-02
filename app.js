require('dotenv').config();
require('./utils/db');
const app = require('express')(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  htmlContentRouter = require('./routers/htmlContent'),
  productRouter = require('./routers/product');

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SERVER START: ' + PORT);
})