const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const CampgronundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  location: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgronundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgronundSchema);
