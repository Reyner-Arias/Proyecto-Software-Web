const express = require("express");
const morgan = require("morgan");
const app = express();

const port = process.env.PORT || 4000;

//app.listen(port, () => console.log("Server port: ", port));
app.set('port', 4000);

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false }))

/* Enrutadores */

//app.use("/admin-get-videogames", require("./routes/admin-videogames.routes"));

module.exports = app;