const mongoose = require("mongoose");
// HERE ENV IS IN USED
require("dotenv").config();

const connectionString = process.env.MONGO_DB_URL;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

module.exports = mongoose;