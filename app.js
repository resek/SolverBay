var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  res.render("index");
});

//new challenge
app.get("/challenges/new", function(req, res) {
  res.render("challenges/new");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});