const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

//app.listen(port, () => console.log("Server port: ", port));
app.set('port', 3000);

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.use(cors())
/* Enrutadores */
app.use("/admin-videogames", require("./routes/admin-videogames.routes"));

module.exports = app;