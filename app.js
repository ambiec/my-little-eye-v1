let express = require("express");
let app = express();

app.use(express.static("public"));

let http = require('http');
let server = http.createServer(app);

let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening on localhost: " + port);
});



// let port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("listening at", port);
// });

// app.get("/", (req, res) => {
//     // res.send("home");
//  });

