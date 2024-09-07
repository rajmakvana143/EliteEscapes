// * required all packages
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapasync = require('./utility/wrapasync');
const ExpressError = require('./utility/ExpressError');
const listingSchema = require('./schema');
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
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate)


const validatelisting = (req, res, next) =>{
  const {error} = listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400 , error);
  }else{
    next();
  }
}

app.get("/", (req, res) => {
  res.send("root is workking");
});

// index route 
app.get("/Listings" , wrapasync(async (req , res) => {
  const allListings  = await Listing.find({});
  res.render("listings/index.ejs" , {allListings});
}));

//  new route
app.get("/Listings/new" , (req , res) => {
  res.render("listings/new.ejs");
});

// show route 
app.get("/Listings/:id" , wrapasync(async (req , res) => {
  let {id} = req.params ;
  let Listings = await Listing.findById(id);
  res.render("listings/show.ejs" , {Listings})
}));

// create route 
app.post("/Listings" ,validatelisting, wrapasync(async (req , res , next) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}))

// edite route 
app.get("/Listings/:id/edit" , wrapasync(async (req ,res) =>{
  let {id} = req.params;
  let data = await Listing.findById(id);
  res.render("listings/edit.ejs" , {data})
}));

//update route
app.put("/Listings/:id" , validatelisting ,wrapasync(async (req , res) => {
  let {id} = req.params;
  let update  = await Listing.findByIdAndUpdate(id , {...req.body.listing});
  res.redirect(`/Listings/${id}`);
}));

// delete route 
app.delete("/Listings/:id" , wrapasync(async (req , res) =>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/Listings");
}));


app.all("*" , (req , res , next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req , res , next) => {
  let {statusCode=500 , message="somthing went wrong"} = err;
  res.render("error.ejs" , {message});
});

// server response
app.listen(port, () => {
  console.log(`port is listening on ${port} `);
});

