const express = require("express");
const mongoose = require("mongoose");

//importing schema
const User = require("./models/User");
const Message = require("./models/Message");

const MONGO_URL =
  "mongodb+srv://Hedwig:hedwig315@hedwig.hdxgaiq.mongodb.net/Hedwig?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, () => {
  console.log("Connection to Database Successful");
});

const app = express();
app.use(express.json());

const PORT = 5000;

// Check Health Status
app.get("/health", (req, res) => {
  res.json({
    status: "All Good ",
  });
});

// Signup data
app.post("/signup", async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    fullName: fullName,
    email: email,
    password: password,
  });

  const savedUser = await newUser.save();

  res.send({
    status: true,
    data: savedUser,
  });
});

//Login
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    password: password,
  });

  if (user) {
    res.send({
      success: true,
      data: user,
    });
  } else {
    res.send({
      success: false,
      data: "wrong credentials! Please try again",
    });
  }
});

//Message sending
app.post("/send" , async (req, res) => {
    const to = req.body.to;
    const from = req.body.from;
    const text = req.body.text;

    const newMessage = new Message({
        to: to,
        from : from,
        text : text
    });

    const savedMessage = await newMessage.save();

    res.send(savedMessage);
});

//Get all messages
app.get("/messages", async (req,res) => {
    const messages = await Message.find();
    res.send(messages);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
