const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const helmet = require('helmet');

const port = process.env.PORT || 3000;

//app.listen(port, () => console.log("Server port: ", port));
app.set('port', 3000);

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.use(helmet());
app.use(cors())
/* Enrutadores */
app.use("/admin-videogames", require("./routes/admin-videogames.routes"));
app.use("/admin-tags", require("./routes/admin-tags.routes"));
app.use("/dev-videogames", require("./routes/dev-videogames.routes"));
app.use("/videogame-tag", require("./routes/videogame-tag.routes"));
app.use("/admin-users", require("./routes/admin-users.routes"));
app.use("/admin-application", require("./routes/admin-application.routes"));

module.exports = app;