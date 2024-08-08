const mongoose = require('mongoose');

// Create a new Schema

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        filename : {
            type : String,
            default : "tourism"
        },
        url : {
            type : String,
        default : "https://images.unsplash.com/photo-1696087636176-b689cb60b9b1?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set : (v) => v === "" ? "https://images.unsplash.com/photo-1696087636176-b689cb60b9b1?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
        }
    },
    price : Number,
    location : String,
    country : String
});

const Listing = new mongoose.model('Listing' , listingSchema)

module.exports = Listing;

