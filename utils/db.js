const mg = require('mongoose'), 
      config = require('./config');

const connectDB = mg.connect(config.mlabURI,  { useNewUrlParser: true }, (err) => {
  if(err)
    console.log(`Cannot connect to DB! ${err}`);
  console.log(`Succesfully connect to DB!`);
})

module.exports = mg;