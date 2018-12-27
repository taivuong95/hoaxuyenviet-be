const app = require('express')(),
      bodyParser = require('body-parser')
      cors = require('cors'),
      require('dotenv').config(),
      require('./utils/db');

app.use(bodyParser());
app.use(cors());


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('SERVER START: ' + PORT);
})