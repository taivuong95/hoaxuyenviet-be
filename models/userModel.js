const mg = require('mongoose'),
  bcrypt = require('bcrypt');

const options = {
  autoIndex: false,
  _id: false,
  id: false,
  collection: 'userList',
  versionKey: false,
  timestamps: true
}

let schema = new mg.Schema({
  _id: {
    type: Number,
    unique: true,
    index: true
  },
  userPermission: {
    role: String,
    password: String
  },
  userData: {
    name: String,
    email: String,
    address: String,
    birth: Date,
    Gender: String,
  },
  rewardPoints: Number
}, options);

// transform password
schema.methods.generateHash = async function (password) {
  return await bcrypt.hashSync(password, bcrypt.genSaltSync(10), (err, hash) => {
    return hash;
  });
};

// validate password
schema.methods.validatePassword = async function (password) {
  return await bcrypt.compareSync(password, this.userData.password, (err, res) => {
    return res;
  });
};


module.exports = mg.model('User', schema);