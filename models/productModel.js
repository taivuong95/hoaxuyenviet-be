const mg = require("mongoose");

const options = {
  autoIndex: false,
  collection: "productList",
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
      required: true,
      text: true
    },
    searchName: {
      type: String,
      required: true,
      text: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: Number,
    new: Boolean,
    sale: Boolean,
    hot: Boolean,
    description: String,
    saleDayBegin: Date,
    saleDayEnd: Date,
    visible: Boolean
  },
  options
);

module.exports = mg.model("Product", schema);
