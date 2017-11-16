var express           = require('express');
var methodOverride    = require('method-override');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var session           = require('express-session');
var bodyParser        = require('body-parser');
var mongoose          = require('mongoose');
var flash             = require('connect-flash');
var expressValidator  = require('express-validator');
var seedDB            = require("./seeds");
var app               = express();

var challengeRoutes = require ("./routes/challenges");
var indexRoutes = require ("./routes/index");
var solutionRoutes = require ("./routes/solutions");
var User = require('./models/user');

seedDB();

//app config
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
mongoose.connect("mongodb://localhost/idea_crowd");
app.use(flash());
app.use(session({
  secret: 'global knowledge',
  resave: false,
  saveUninitialized: false
}));

//passportjs config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'incorrect username' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'incorrect password' });
      }
      return done(null, user);
    });
  }
));

//global variables
app.use(function(req, res, next) {
  res.locals.messages = req.flash('info');
  res.locals.errMessages = req.flash("error");
  next();
});

//use routes 
app.use (indexRoutes);
app.use (challengeRoutes);
app.use (solutionRoutes);

//server config
app.listen(3000, function () {
  console.log('App has started!')
});