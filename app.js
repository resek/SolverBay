var express      = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var app          = express();

var Challenge = require ("./models/challenge");

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/idea_crowd");

//homepage
app.get('/', function (req, res) {
  res.render("homepage");
});

//challenges index
app.get("/challenges", function (req, res) {
  res.render("challenges/index");
});

//challenges new
app.get("/challenges/new", function(req, res) {
  res.render("challenges/new");
});

//create route
app.post("/challenges", function(req, res) {
  Challenge.create(req.body, function(err, newChallenge) {
    if(err) {
      console.log(err);
    } else {
      console.log(req.body);
      res.redirect ("/");
    }
  });
});

//server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});