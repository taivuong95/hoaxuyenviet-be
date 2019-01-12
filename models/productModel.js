const mg = require('mongoose');

const options = {
  autoIndex: false,
  collection: 'productList',
  _id: false,
  id: false,
  versionKey: false,
  timestamps: true
}
let schema = new mg.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  images: {
    type: Array,
    required: true
  },
  type: Array,
  form: Array,
  event: Array,
  color: Array,
  holiday: Array,
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: Number,
  new: Boolean,
  sale: Boolean,
  hot: Boolean,
  description: Array,
  saleDayBegin: Date,
  saleDayEnd: Date
}, options);

module.exports = mg.model('Product', schema);