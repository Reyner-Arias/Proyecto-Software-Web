const express = require("express");
const morgan = require("morgan");
const app = express();

const port = process.env.PORT || 3000;

//app.listen(port, () => console.log("Server port: ", port));
app.set('port', 3000);

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false }))

/* Enrutadores */
app.use("/admin-videogames", require("./routes/admin-videogames.routes"));
app.use("/admin-tags", require("./routes/admin-tags.routes"));

module.exports = app;