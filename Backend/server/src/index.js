const app = require("./app")
require("./database")

/* Variable global asignada en app.js */
const port = app.get('port')

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});