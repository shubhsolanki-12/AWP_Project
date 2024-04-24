const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const { object, string } = require('joi');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    url: {
      type: String,
      default: 
      "https://images.unsplash.com/photo-1703252932379-3bbcb1b9c311?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) => v === "" ? "https://images.unsplash.com/photo-1703252932379-3bbcb1b9c311?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
    }
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  country:{
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
})

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing) {
    await Review.deleteMany({ _id : {$in: listing.reviews }})
  }
})


const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;