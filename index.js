// * required all packages
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var methodOverride = require('method-override')
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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(port, () => {
  console.log(`port is listening on ${port} `);
});

app.get("/", (req, res) => {
  res.send("root is workking");
});

// index route 
app.get("/Listings" , async (req , res) => {
  const allListings  = await Listing.find({});
  res.render("listings/index.ejs" , {allListings});
});

//  new route
app.get("/Listings/new" , (req , res) => {
  res.render("listings/new.ejs")
});

// show route 
app.get("/Listings/:id" , async (req , res) => {
  let {id} = req.params ;
  let Listings = await Listing.findById(id);
  res.render("listings/show.ejs" , {Listings})
});

// create route 
app.post("/Listings" , async (req , res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
})

// edite route 

app.get("/Listings/:id/edit" , async (req ,res) =>{
  let {id} = req.params;
  let data = await Listing.findById(id);
  res.render("listings/edit.ejs" , {data})
});

app.put("/Listings/:id" , async (req , res) => {
  let {id} = req.params;
  let update  = await Listing.findByIdAndUpdate(id , {...req.body.listing});
  res.redirect("/Listings");
});

