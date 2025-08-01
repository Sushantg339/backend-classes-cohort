const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("error connecting to DB : ", err);
    });
};

module.exports = connectToDB;
