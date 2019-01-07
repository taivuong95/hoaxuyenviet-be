const mg = require('mongoose');

const options = {
  autoIndex: false,
  collection: 'orderList',
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
  customerInfo: {
    name: String,
    email: String,
    phone: {
      type: Number,
      unique: true
    },
    address: String
  },
  receiverInfo: {
    name: String,
    phone: {
      type: Number,
      unique: true
    },
    address: String
  },
  order: {
    note: String,
    payment: String,
    deliveryDate: Date,
    status: String,
    productOrder: [{
      name: String,
      price: Number,
      quantity: Number,
      discount: Number
    }],
    finalPrice: Number
  }
}, options);

module.exports = mg.model('Order', schema);