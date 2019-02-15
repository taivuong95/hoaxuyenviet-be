const mg = require("mongoose");

const options = {
  autoIndex: false,
  collection: "orderList",
  _id: false,
  id: false,
  versionKey: false,
  timestamps: true
};
let schema = new mg.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true
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
      deliveryDate: String,
      status: String,
      productOrder: [
        {
          productName: String,
          price: Number,
          quantity: Number,
          discount: Number,
          images: Array,
          _id: String
        }
      ],
      finalPrice: Number
    }
  },
  options
);

module.exports = mg.model("Order", schema);
