const express = require("express");
const app = express();
const cors = require("cors");
const FriendsApi = require("./api/FriendsApi");
// import database and just call
require('./config/mongodb');
var favicon = require('serve-favicon');
var path = require('path');
require("dotenv").config();

// call from api\FriendsApi.js
app.use(FriendsApi);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// accept all the json data
app.use(express.json());
// use cors 
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,// For legacy browser support
  methods: "GET, PUT"
}
app.use(cors(corsOptions));

const portNumber = process.env.PORT_URL;

app.listen(portNumber, () => {
  console.log(`Server is running on live ${portNumber}`);
});







