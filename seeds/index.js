const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "639193f432e929e10cfce580",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem reiciendis asperiores, tempora voluptate repellendus iure! Quis aut veniam error, eveniet voluptatibus quidem asperiores, corporis facilis ipsa nulla repudiandae saepe! Aliquid!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dnwif6krj/image/upload/v1670680231/YelpCamp/izpncgjpedvfovelli8b.jpg",
          filename: "YelpCamp/izpncgjpedvfovelli8b",
        },
        {
          url: "https://res.cloudinary.com/dnwif6krj/image/upload/v1670680229/YelpCamp/syotvp5ew0iu0hopntty.jpg",
          filename: "YelpCamp/syotvp5ew0iu0hopntty",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
