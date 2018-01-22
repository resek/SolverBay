var express = require('express');
var router = express.Router();
var Challenge = require ("../models/challenge");
var Solution = require ("../models/solution");
var middleware = require ("../middleware");

//solutions - new
router.get ("/challenges/:id/solutions/new", middleware.isLoggedIn, function (req, res) {
    Challenge.findById (req.params.id, function (err, foundChallenge) {
        if(err) {
            console.log (err);
        } else {
            var currentTime = new Date().toISOString();
            var challengeTime = new Date(foundChallenge.date).toISOString();
            if(currentTime >= challengeTime) {
                req.flash("info", "time is out");
                res.redirect("/challenges/" + req.params.id);
            } else {
                res.render ("solution/new", {foundChallenge: foundChallenge});
            }             
        }
    });
});

//solutions - create
router.post ("/challenges/:id/solutions", function (req, res) {
    Challenge.findById(req.params.id, function(err, foundChallenge) {
        if(err) {
            console.log(err);
        } else {
            Solution.create (req.body, function(err, newSolution) {
                if(err) {
                    console.log(err);
                } else {
                    newSolution.author.username = req.user.username;
                    newSolution.author.email = req.user.email;
                    newSolution.author.id = req.user._id;
                    newSolution.save(); 
                    foundChallenge.solutions.push(newSolution);
                    foundChallenge.save();                
                    res.redirect ("/challenges/" + req.params.id);
                }
            });
        }
    });
});

//solutions - edit
router.get ("/challenges/:id/solutions/:solutionId/edit", middleware.checkSolutionOwnership, function (req, res) {
    Challenge.findById(req.params.id, function(err, foundChallenge) {
        if(err) {
            console.log(err);
        } else {
            Solution.findById(req.params.solutionId, function(err, foundSolution) {
                if(err) {
                    console.log(err);
                } else {
                    var currentTime = new Date().toISOString();
                    var challengeTime = new Date(foundChallenge.date).toISOString();
                    if(currentTime >= challengeTime) {
                        req.flash("info", "time is out");
                        res.redirect("/challenges/" + req.params.id);
                    } else {
                        res.render ("solution/edit", {foundChallenge: foundChallenge, foundSolution: foundSolution});
                    }                    
                }
            });
        }
    });
});

//solutions - update
router.put ("/challenges/:id/solutions/:solutionId", middleware.checkSolutionOwnership, function (req, res) {
    Solution.findByIdAndUpdate (req.params.solutionId, req.body, function (err) {
        if(err) {
            console.log(err); 
        } else {
            req.flash("info", "solution has been updated");
            res.redirect ("/challenges/" + req.params.id);
        }
    });
});

//solutions - delete
router.delete ("/challenges/:id/solutions/:solutionId", middleware.checkSolutionOwnership, function(req, res) {
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
                    req.flash("info", "solution has been deleted")
                    res.redirect ("/challenges/" + req.params.id);
                }
            });
        }
    });
});

module.exports = router;