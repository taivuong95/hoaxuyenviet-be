const mg = require("mongoose");

const options = {
  collection: "blogList",
  versionKey: false,
  timestamps: true
};
let schema = new mg.Schema(
  {
    title: String,
    image: String,
    content: String
  },
  options
);

module.exports = mg.model("Blog", schema);
