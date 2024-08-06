const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

//required of folders
const Listing = require("./models/listing"); 


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

app.listen(port, () => {
  console.log(`port is listening on ${port} `);
});

app.get("/", (req, res) => {
  res.send("root is workking");
});

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title : "My New Villa" ,
        description : "A spacious villa with beautiful views",
        price : 1800,
        location : "Calangute , Goa ",
        country : "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful Testing ");
});



