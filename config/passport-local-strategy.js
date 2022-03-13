const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;



// Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },


    function (req, email, password, done) {

      // User and Updating it's entity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (!user || user.password != password) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

   // check if user is authenticated

   
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/sign-in");
};



passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to locals
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
