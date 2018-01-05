var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var middleware = require ("../middleware");
var multer = require('multer');
var path = require('path');

//index
router.get("/challenges", function (req, res) { 
    Challenge.find({}).sort("-date").exec(function(err, challenges) {
        if(err) {
            console.log(err);
        } else {
            res.render("challenge/index", {challenges: challenges});            
        }
    });  
});
  
//new
router.get("/challenges/new", middleware.isLoggedIn, function(req, res) {
    res.render("challenge/new");
});
  
//create
router.post("/challenges", function(req, res) {
    Challenge.create(req.body, function(err, newChallenge) {
        if(err) {
            console.log(err);
        } else {
            newChallenge.author.username = req.user.username;
            newChallenge.author.id = req.user._id;
            newChallenge.save();
            var challengeId = encodeURIComponent(newChallenge._id);
            res.redirect('/pay?valid=' + challengeId);
        }
    });
});
  
//show
router.get("/challenges/:id", function (req, res) {
    var id = req.params.id;
    Challenge.findById(id).populate({path: "solutions"}).exec(function(err, foundChallenge) {
        if(err) {
            console.log(err)
        } else if (foundChallenge.isPaid === false) {
            req.flash("info", "challenge not paid");
            res.redirect("/challenges");            
        } else {
            res.render("challenge/show", {foundChallenge: foundChallenge});
        }
    });
});

//edit
router.get ("/challenges/:id/edit", middleware.checkChallengeOwnership, function (req, res) {
    Challenge.findById(req.params.id, function(err, foundChallenge) {
        if(err) {
            console.log(err);
        } else if (foundChallenge.solutions.length > 0) {
            req.flash("info", "solutions already posted");
            res.redirect ("/challenges/" + req.params.id);
        } else {
            res.render ("challenge/edit", {foundChallenge: foundChallenge});
        }
    });
});

//update
router.put ("/challenges/:id", middleware.checkChallengeOwnership, function (req, res) {
    Challenge.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if(err) {
            console.log(err); 
        } else {
            req.flash ("info", "your challenge has been updated");
            res.redirect ("/challenges/" + req.params.id);
        }
    });
});

//delete
// router.delete ("/challenges/:id", middleware.checkChallengeOwnership, function(req, res) {
//     Challenge.findByIdAndRemove (req.params.id, function (err) {
//         if(err) {
//             console.log(err);
//         } else {
//             req.flash ("info", "your challenge has been deleted");
//             res.redirect ("/challenges");
//         }
//     });
// });

//upload files with multer
//STORAGE ENGINE 
var storage = multer.diskStorage({ 
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//INIT UPLOAD
  var upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
      }
  }).single('files');

//CHECK FILE TYPE
function checkFileType(file, cb){
    // Allowed extensions
    var filetypes = /jpeg|jpg|pdf|txt|docx|xlsx|png|gif/;
    // Check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    var mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
    return cb(null,true);
    } else {
    cb('Error: File type not allowed');
    }
} 

//UPLOAD ROUTE
router.post ("/upload", function(req, res) {
    upload(req, res, (err) => {
        if(err) {
            res.render('challenge/new', {msg: err});
        } else if (req.file == undefined) {
            res.render('challenge/new', { msg: 'Error: No file selected' });            
        } else {
            res.render('challenge/new', { msg: 'File uploaded' });
        }
    });
});

module.exports = router;