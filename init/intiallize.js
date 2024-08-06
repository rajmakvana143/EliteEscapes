const mongoose = require('mongoose');
const initData = require("./data.js");

const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log("object error: " + err);
  });

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wanderlast");
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  
  initDB();