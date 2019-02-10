const mg = require("mongoose");

const options = {
  autoIndex: false,
  _id: false,
  id: false,
  collection: "blogList",
  versionKey: false,
  timestamps: true
};
let schema = new mg.Schema({
    _id: {
      type: String,
      required: true,
      unique: true
    },
    title: String,
    image: String,
    content: String
  },
  options
);

module.exports = mg.model("Blog", schema);