const app = require('express')(),
      bodyParser = require('body-parser')
      cors = require('cors'),
      require('dotenv').config(),
      require('./utils/db'),
      htmlContentRouter = require('./routers/htmlContent');;

app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
app.use(bodyParser.json({extended:true,limit:'50mb'}));
app.use(cors());

app.use('/', htmlContentRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SERVER START: ' + PORT);
})