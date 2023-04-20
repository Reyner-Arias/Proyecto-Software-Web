const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    //"mongodb://aketech:ake123@140.84.184.137:27017/ExcalinestDB",
    "mongodb+srv://excalinest:AcWqA5Ez6LNGUiKF@excalinestcluster.auytmua.mongodb.net/ExcalinestDB?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((db) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to the database"));

module.exports = mongoose;