const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

// create friend schema
// scheme me jo nam hain wo data base me save hot hain confuse mt hona
const friendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

});

const FriendModels = Model("friends", friendSchema);

// export friend model
module.exports = FriendModels;
