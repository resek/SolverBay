var express = require('express');
var router = express.Router();
var multer = require('multer');
var Challenge = require ("../models/challenge");
var Token = require ("../models/token");
var User = require ("../models/user");
var Email = require ("../models/email");
var passport = require ("passport");
var nodemailer = require ("nodemailer");
var crypto = require ("crypto-browserify");

//HOMEPAGE
router.get('/', function (req, res) {
    Challenge.find({}).sort("-date").exec(function(err, allChallenges) {
        if(err) {
            console.log(err);
        } else {
            res.render("homepage", {allChallenges: allChallenges});
        }
    });
});

//SIGN-UP FORM
router.get ("/register", function(req, res) {
    res.render ("register");
});

//HANDLING SIGN-UP
router.post ("/register", function(req, res) {
    
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //express validator
    req.checkBody("password2").equals(req.body.password);
    var errors = req.validationErrors();
    
    if(errors) {
        req.flash("info", "passwords do not match");
        res.redirect("/register");
    } else {
        User.create (req.body, function (err, user) {
            if (err) {
                if (err.errors.username !== undefined) { //from uniqueValidator mongoose plugin
                    req.flash("info", err.errors.username.message);
                    res.redirect("/register");
                } else if (err.errors.email !== undefined) {
                    req.flash("info", err.errors.email.message);
                    res.redirect("/register");
                }            
            } else {
                
                // create a verification token for this user
                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                token.save();
                
                //set nodemailer
                var transporter = nodemailer.createTransport({
                    host: 'mail.sloveniafood.com',
                    port: 465,
                    secure: true, 
                    auth: {
                        user: "hello@sloveniafood.com",
                        pass: process.env.EMAIL_PASS
                        },
                    tls: { rejectUnauthorized: false }
                });

                // setup email data
                var mailOptions = {
                    from: '"SolverBay" <hello@sloveniafood.com>', // sender address
                    to: user.email, // list of receivers
                    subject: 'Account Verification Token',
                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token,
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log("message has been sent");
                    req.flash("info", "check your email for confirmation")
                    res.redirect("/register");
                });
            }            
        });
    }    
});


//EMAIL CONFIRMATION HANDLING
router.get('/confirmation/:token', function(req, res) {    
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) {
            req.flash("info", "not valid token")
            res.redirect("/register");
        } else {            
            User.findOne({ _id: token._userId }, function (err, user) {
                if (!user) {
                    console.log(err);
                    req.flash("info", "user for this token not found");
                    res.redirect("/register");
                } else if (user.isVerified) {
                    req.flash("info", "user has already been verified");
                    res.redirect("/register");
                } else {
                    user.isVerified = true;
                    user.save(function (err) {
                        if(err) {
                            console.log(err);
                        } else {
                            req.flash("info", "account has been verified, please login");
                            res.redirect("/login");
                        }                     
                    });                    
                }
            });
        }
    });
});

//EMAIL RESET FORM
router.get ("/passwordemail", function (req, res) {
    res.render("password/email");
});

//SEND PASSWORD RESET EMAIL
router.post ("/passwordemail", function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(!user) {
            req.flash("info", "incorrect email");
            res.redirect("/passwordemail");
        } else {
            // create a verification token for this user
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save();

            //set nodemailer
            var transporter = nodemailer.createTransport({
                host: 'mail.sloveniafood.com',
                port: 465,
                secure: true, 
                auth: {
                    user: "hello@sloveniafood.com",
                    pass: process.env.EMAIL_PASS
                    },
                tls: { rejectUnauthorized: false }
            });

            // setup email data
            var mailOptions = {
                from: '"SolverBay" <hello@sloveniafood.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Reset your password',
                text: 'Hello,\n\n' + 'Reset your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/reset\/' + token.token,
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                console.log("message has been sent");
                req.flash("info", "check your email for password reset")
                res.redirect("/login");
            });
        } 
    });
});

//CHECK FOR RESET TOKEN FROM EMAIL LINK
router.get('/reset/:token', function(req, res) {    
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) {
            req.flash("info", "not valid token");
            res.redirect("/passwordemail");
        } else {
            res.render ("password/reset");
        }
    });
});

//RESET PASSWORD
router.post("/reset", function(req, res) {
    
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //express validator
    req.checkBody("password2").equals(req.body.password);
    var errors = req.validationErrors();
    
    if(errors) {
        req.flash("info", "passwords do not match");
        res.redirect("back");
    } else {
        User.findOne({email: req.body.email}, function(err, user) {
            if(!user) {
                req.flash("info", "incorrect email");
                res.redirect("back");
            } else {
                user.password = req.body.password;
                user.save();
                req.flash("info", "password has been changed");
                res.redirect("/login");
            }
        });
    }
});

//LOGIN FORM
router.get ("/login", function (req, res) {
    res.render ("login");
});

//HANDLING LOGIN
router.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login',
                                 failureFlash: true  })
);

//LOGOUT ROUTE
router.get ("/logout", function(req, res) {
    req.flash("info", "you have been logged out")
    req.logout();
    res.redirect ("/login");
});

//NEWSLETTER
var upload = multer();

router.post("/newsletter", upload.single("email"), function(req, res, next) {
    Email.create(req.body, function (err){
        if (err) {
            console.log(err);
        }
    });
    res.json("Thank you!")
});

//TERMS & CONDITIONS
router.get ("/terms", function(req, res) {
    res.render("terms");
});

//ABOUT US
router.get ("/about", function(req, res) {
    res.render("about");
});

module.exports = router;