var express         = require('express');
var methodOverride  = require('method-override');
var passport        = require('passport');
var LocalStrategy   = require('passport-local');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var flash           = require('connect-flash');
var seedDB          = require("./seeds");
var app             = express();

var Challenge = require ("./models/challenge");
var Solution = require ("./models/solution");
var User = require('./models/user');

seedDB();
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/idea_crowd");
app.use(session({
  secret: 'global knowledge',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

//user register / login settings
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.messages = req.flash('info');
  next();
});

//sign up form
app.get ("/register", function(req, res) {
  res.render ("register");
});

//handling user sign up
app.post ("/register", function(req, res) {
  User.register (new User ({username: req.body.username}), req.body.password, function (err, user) {
    if (err) {
        console.log(err);
        return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect ("/");
      });  
    }
  });
});

//login form
app.get ("/login", function (req, res) {
  res.render ("login");
});

//login logic
app.post ("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res) {
});

//logout route
app.get ("/logout", function(req, res) {
  req.logout();
  res.redirect ("/");
});

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
     return next();
  }
  req.flash('info', 'You have to be logged in!');
  res.redirect("/login");
}

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
      res.render("challenge/index", {challenges: challenges});
    }
  });  
});

//challenges - new
app.get("/challenges/new", isLoggedIn, function(req, res) {
  res.render("challenge/new");
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
  Challenge.findById(id).populate({path: "solutions"}).exec(function(err, foundChallenge) {
    if(err) {
      console.log(err)
    } else {
      res.render("challenge/show", {foundChallenge: foundChallenge});
    }
  });
});

//solutions - new
app.get ("/challenges/:id/solutions/new", isLoggedIn, function (req, res) {
  Challenge.findById (req.params.id, function (err, foundChallenge) {
      if(err) {
          console.log (err);
      } else {          
        res.render ("solution/new", {foundChallenge: foundChallenge}); 
      }
  });
});

//solutions - create
app.post ("/challenges/:id/solutions", function (req, res) {
  Challenge.findById(req.params.id, function(err, foundChallenge) {
    if(err) {
      console.log(err);
    } else {
      Solution.create (req.body, function(err, newSolution) {
        if(err) {
          console.log(err);
        } else { 
          foundChallenge.solutions.push(newSolution);
          foundChallenge.save();                
          res.redirect ("/challenges/" + req.params.id);
        }
      });
    }
  });
});

//solutions - edit
app.get ("/challenges/:id/solutions/:solutionId/edit", function (req, res) {
  Challenge.findById(req.params.id, function(err, foundChallenge) {
    if(err) {
        console.log(err);
    } else {
      Solution.findById(req.params.solutionId, function(err, foundSolution) {
        if(err) {
            console.log(err);
        } else {
            res.render ("solution/edit", {foundChallenge: foundChallenge, foundSolution: foundSolution});
        }
      });
    }
  });
});

//solutions - update
app.put ("/challenges/:id/solutions/:solutionId", function (req, res) {
  console.log(req.body);
  Solution.findByIdAndUpdate (req.params.solutionId, req.body, function (err) {
    if(err) {
        console.log(err); 
    } else {
      res.redirect ("/challenges/" + req.params.id);
    }
  });
});

//solutions - delete
app.delete ("/challenges/:id/solutions/:solutionId", function(req, res) {
  Solution.findByIdAndRemove (req.params.solutionId, function (err) {
    if(err) {
      console.log(err);
    } else {
      Challenge.findById(req.params.id, function (err, foundChallenge) {
        if (err) {
            console.log(err);
        } else {
          foundChallenge.solutions.remove(req.params.solutionId); 
          foundChallenge.save();
          res.redirect ("/challenges/" + req.params.id);
        }
      });
    }
  });
});

//server
app.listen(3000, function () {
  console.log('App has started!')
});