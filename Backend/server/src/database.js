const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb://aketech:ake123@140.84.181.248:27017/ExcalinestDB",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((db) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to the database"));

module.exports = mongoose;