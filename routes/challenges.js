var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var middleware = require ("../middleware");

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

module.exports = router;