var Challenge = require ("../models/challenge");
var Solution = require ("../models/solution");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('info', 'you have to be logged in');
    res.redirect("/login");
};

middlewareObj.checkChallengeOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Challenge.findById(req.params.id, function (err, foundChallenge) {
            if(err) {
                res.redirect("back");
            } else {
                if (foundChallenge.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash ("info", "you are not authorized to do that")
                    res.redirect ("/challenges/" + req.params.id);
                }
            }
        });
   } else {
        req.flash ("info", "you have to be logged in");
        res.redirect ("/login");
   }
};

middlewareObj.checkSolutionOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Solution.findById(req.params.solutionId, function (err, foundSolution) {
            if(err) {
                res.redirect("back");
            } else {
                if (foundSolution.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash ("error", "You are not authorized to do that!")
                    res.redirect ("/challenges/" + req.params.id);
                }
            }
        });
   } else {
        req.flash ("error", "You have to be logged in to do that!");
        res.redirect ("/login");
   }
};

module.exports = middlewareObj;