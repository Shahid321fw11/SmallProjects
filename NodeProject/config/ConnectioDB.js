const mongoose = require("mongoose");

const connenction = () => {
  try {
    console.log("db connection established");
    return mongoose.connect(process.env.MongoURI);
  } catch (error) {
    console.log("error connecting...");
  }
};

module.exports = connenction;
