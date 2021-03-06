var express           = require('express');
var helmet            = require('helmet')
var methodOverride    = require('method-override');
var passport          = require('passport');
var dotenv            = require('dotenv').config()
var LocalStrategy     = require('passport-local').Strategy;
var session           = require('express-session');
var bodyParser        = require('body-parser');
var mongoose          = require('mongoose');
var flash             = require('connect-flash');
var expressValidator  = require('express-validator');
var paypal            = require('paypal-rest-sdk');
var seedDB            = require("./seeds");
var app               = express();

var challengeRoutes = require ("./routes/challenges");
var indexRoutes = require ("./routes/index");
var solutionRoutes = require ("./routes/solutions");
var filesRoutes = require ("./routes/files");
var paypalRoutes = require("./routes/paypal");
var User = require('./models/user');

//seedDB();

//app config
app.use(helmet());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
mongoose.connect(process.env.MLAB_MONGODB, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//paypal config
paypal.configure({
  'mode': 'live',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET,
});

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
        return done(null, false, { message: 'incorrect email' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'incorrect password' });
      }
      // Make sure the user has been verified
      if (!user.isVerified) {
        return done (null, false, { message: 'your account has not been verified' });
      } 
      return done(null, user);
    });
  }
));

//global variables
app.use(function(req, res, next) {
  res.locals.messages = req.flash('info');
  res.locals.errMessages = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//use routes 
app.use (indexRoutes);
app.use (challengeRoutes);
app.use (solutionRoutes);
app.use (paypalRoutes);
app.use (filesRoutes);

//if route does not exist
app.get('*', function(req, res){
  res.redirect("/");
});

//server config
app.listen(process.env.PORT || 3000, function () {
  console.log('App has started!')
});
