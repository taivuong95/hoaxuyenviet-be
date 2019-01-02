const mg = require('mongoose');

const options = {
  autoIndex: false,
  collection: 'productList',
  _id: false,
  id: false,
  versionKey: false
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
  productType: Array,
  productForm: Array,
  productEvent: Array,
  productColor: Array,
  productHoliday: Array,
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

module.exports = mg.model('productList', schema);