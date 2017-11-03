// https!?
var express      = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var seedDB       = require("./seeds");
var app          = express();

var Challenge = require ("./models/challenge");

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/idea_crowd");

seedDB();

//homepage
app.get('/', function (req, res) {
  Challenge.find({}).sort("date").exec(function(err, challenges) {
    if(err) {
      console.log(err);
    } else {
      res.render("homepage", {challenges: challenges});
    }
  });
});

//challenges - index
app.get("/challenges", function (req, res) {
  Challenge.find({}, function(err, challenges) {
    if(err) {
      console.log(err);
    } else {
      res.render("challenges/index", {challenges: challenges});
    }
  });  
});

//challenges - new
app.get("/challenges/new", function(req, res) {
  res.render("challenges/new");
});

//challenges - create
app.post("/challenges", function(req, res) {
  Challenge.create(req.body, function(err, newChallenge) {
    if(err) {
      console.log(err);
    } else {
      res.redirect ("/challenges");
    }
  });
});

//challenges - show
app.get("/challenges/:id", function (req, res) {
  var id = req.params.id;
  Challenge.findById(id, function(err, foundChallenge) {
    if(err) {
      console.log(err)
    } else {
      res.render("challenges/show", {foundChallenge: foundChallenge});
    }
  });
});

//server
app.listen(3000, function () {
  console.log('App has started!')
});