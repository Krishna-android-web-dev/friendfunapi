const express = require("express");
const app = express();
const cors = require("cors");
const FriendModels = require("./models/FriendModels");
const mongoose = require("mongoose");
require("dotenv").config();
var favicon = require('serve-favicon');
var path = require('path');
require("dotenv").config();

// call from api\FriendsApi.js
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// accept all the json data
app.use(express.json());
// use cors 

app.use(cors());

mongoose.connect("mongodb+srv://krishna001:Password@merncluster.aepwq.mongodb.net/friends_db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

const portNumber = process.env.PORT_URL;

app.listen(portNumber, () => {
  console.log(`Server is running on live ${portNumber}`);
});


// as per your requirement import the model
app.get("/", (req, res) => {
  // show mesasge in bold font and in green color
  // res.send({
  //   message: "Welcome to the API",
  //   status: "success",
  //   publicAccess: "yes",
  // });

  //  add center add style to the message
  res.send(`<center>
  <h1 style="color:green">Welcome to the API</h1>
  <h2> Server is running Live </h2>
  
  </center>`);
});

// post

app.post("/addFriends", async (req, res) => {
  // make dynamic url
  const userExists = await FriendModels.findOne({ email: req.body.email });
  if (userExists) {
    res.send({ "actualData": userExists, "message": `An Account with Email ${userExists.email} already Exists` });

  } else {
    const friend = new FriendModels({
      // name: req.body.name,
      // age: req.body.age,
      // desc: req.body.desc,
      ...req.body,
    });
    try {
      const savedFriend = await friend.save();
      res.send({ "actualData": savedFriend, "status": "success", "message": "Friend added successfully" });
    } catch (error) {
      res.send({ "actualData": error, "status": "failed", "message": "Something went wrong" });
    }
  }
}),

  // read
  app.get("/read", async (req, res) => {
    // two parameter is required to  get data, either it will use or not(req,res)
    const friends = await FriendModels.find();
    //   if you will concatenate with string , it will not consider a valid json
    //   res.send("data fetched" + friends);
    res.send(friends);
    //   2nd method
    //   with error handle
    //  try {
    //     const friends = await FriendModels.find();
    //     res.send(friends);
    //   } catch (err) {
    //     res.send(err);
    //   }
  });

// get data by id
app.get("/getFriendById/:id", async (req, res) => {
  const friend = await FriendModels.findById(req.params.id);
  res.send(friend);
});

// delete data by id
app.delete("/deleteFriendById/:id", async (req, res) => {
  const deletedFriend = await FriendModels.findByIdAndDelete(req.params.id);
  res.send({ "actualData": deletedFriend, "status": "success", "message": "Friend Deleted successfully" });
}
);
// update
app.put("/updateFriendById/:id", async (req, res) => {
  //  handle error
  try {
    const updatedFriend = await FriendModels.findByIdAndUpdate(req.params.id, req.body);
    //  get modified data from database then sent it to frontend
    res.send({ "actualData": updatedFriend, "status": "success", "message": "Friend Updated successfully" });
  }
  catch (error) {
    res.send({ "actualData": error, "status": "failed", "message": "Something went wrong" });
  }
}
);


// delete all the data from database
app.delete("/deleteAll", async (req, res) => {
  const deletedAll = await FriendModels.deleteMany();
  res.send({ "actualData": deletedAll, "status": "success", "message": "All Friends Deleted successfully" });
}
);





