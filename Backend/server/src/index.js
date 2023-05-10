const app = require("./app")
require("./database")

/* Variable global asignada en app.js */
const port = app.get('port')

app.listen(port);
console.log("Running on port", port)