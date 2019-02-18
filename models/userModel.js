const mg = require("mongoose"),
  bcrypt = require("bcrypt");
Schema = mg.Schema;

const options = {
  autoIndex: false,
  _id: false,
  id: false,
  collection: "userList",
  versionKey: false,
  timestamps: true
};

let schema = new mg.Schema(
  {
    _id: {
      type: Schema.Types.Number,
      unique: true,
      index: true
    },
    userPermission: {
      role: String,
      password: String,
      resetLink: String
    },
    userInfo: {
      name: String,
      email: String,
      address: String,
      birth: String,
      gender: String,
      rewardPoints: Number
    }
  },
  options
);

// transform password
schema.methods.generateHash = async function(password) {
  return await bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10),
    (err, hash) => {
      return hash;
    }
  );
};

// validate password
schema.methods.validatePassword = async function(password, dbpassword) {
  return await bcrypt.compareSync(password, dbpassword, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};

module.exports = mg.model("User", schema);
