const mg = require("mongoose");
const Schema = mg.Schema;
const options = {
  collection: "cartList",
  versionKey: false,
  timestamps: true
};

let schema = new mg.Schema(
  {
    userInfo: {
      type: Schema.Types.Number,
      ref: "User"
    },
    productOrder: Array
  },
  options
);

module.exports = mg.model("Cart", schema);
