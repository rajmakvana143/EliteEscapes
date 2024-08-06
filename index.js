// * required all packages
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 3000;


// * required of folders
const Listing = require("./models/listing"); 


// * mongooDB connection
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


// * all routes definded here 

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));

app.listen(port, () => {
  console.log(`port is listening on ${port} `);
});

app.get("/", (req, res) => {
  res.send("root is workking");
});

// index.route 
app.get("/listings" , async (req , res) => {
  const allListings  = await Listing.find({});
  res.render("listings/index.ejs" , {allListings});
});



