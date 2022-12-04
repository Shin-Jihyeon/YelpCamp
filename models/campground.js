const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgronundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  location: String,
  description: String,
});

module.exports = mongoose.model("Campground", CampgronundSchema);
