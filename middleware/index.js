var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('info', 'You have to be logged in!');
    res.redirect("/login");
};

module.exports = middlewareObj;