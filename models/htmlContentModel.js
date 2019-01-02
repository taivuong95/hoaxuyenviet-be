const mg = require('mongoose');

const options = {
  autoIndex: false,
  collection: 'htmlContent',
  _id: false,
  id: false,
  versionKey: false
}
let schema = new mg.Schema({
  _id: String,

  bannerSlide: [{
    image: String,
    eventLink: String
  }],

  eventSlide: {
    firstSlide: [{
      image: String,
      eventLink: String
    }],
    secondSlide: [{
      image: String,
      eventLink: String
    }],
  },

  otherSlide: {
    firstSlide: [{
      image: String,
      eventLink: String
    }],
    secondSlide: [{
      image: String,
      eventLink: String
    }],
  }
}, options);

module.exports = mg.model('htmlContent', schema);