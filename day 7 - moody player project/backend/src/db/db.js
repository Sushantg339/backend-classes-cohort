const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.error("error connecting to db :", err);
    });
};

module.exports = connectDB;
