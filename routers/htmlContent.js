const router = require('express').Router();

let htmlContentModel = require('../models/htmlContentModel');

router.post('/htmlContent', (req, res) => {
  htmlContentModel.findById("htmlContent", (err, data) => {
    if(data) {
      htmlContentModel.updateOne(req.body, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          res.json('Updated');
        }
      })
    }
    else {
      htmlContentModel.create(req.body, (err, data) => {
        if(err) {
          console.log(err);
        }else {
          res.json("Created");
        }
      })
    }
  })
})

router.get('/htmlContent', (req, res) => {
  htmlContentModel.findOne((err, data) => {
    if(err) {
      console.log(err);
    }else {
      res.json(data);
      console.log(data);
    }
  })
})

module.exports = router;