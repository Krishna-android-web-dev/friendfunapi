const express = require("express");
const FriendModels = require("../models/FriendModels");
const router = express.Router();
const cors = require("cors");

router.use(cors());

// as per your requirement import the model
router.get("/", cors(), (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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

router.post("/addFriends", cors(), async (req, res) => {
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
    router.get("/read", cors(), async (req, res) => {
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
router.get("/getFriendById/:id", cors(), async (req, res) => {
    const friend = await FriendModels.findById(req.params.id);
    res.send(friend);
});

// delete data by id
router.delete("/deleteFriendById/:id", cors(), async (req, res) => {
    const deletedFriend = await FriendModels.findByIdAndDelete(req.params.id);
    res.send({ "actualData": deletedFriend, "status": "success", "message": "Friend Deleted successfully" });
}
);
// update
router.put("/updateFriendById/:id", cors(), async (req, res) => {
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
router.delete("/deleteAll", cors(), async (req, res) => {
    const deletedAll = await FriendModels.deleteMany();
    res.send({ "actualData": deletedAll, "status": "success", "message": "All Friends Deleted successfully" });
}
);


// to use others
module.exports = router;