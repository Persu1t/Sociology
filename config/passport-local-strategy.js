const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const User  = require('../models/user')




// Authentication using passport
passport.use(new LocalStrategy({
  usernameField: 'email'
  },
  function(email, password, done) {
    // find a user and establish the identity
    User.findOne({ email: email}, function(err, user) {
      if (err) {
        console.log("Error in finding the user --> Passport");
        return done(err)
      }

      if(!user || user.password != password) {
        console.log('Invalid Username or Password')
        return done(null, false)
      }

      return done(null, user)
    })
  }
));

// serializing the user to decide which key to be stored in cookie
passport.serializeUser(function(user, done) {
  done(null, user.id)
});

// deserializing the user tonform the key in cookie
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err){
      console.log("Error in finding the user --> Passport");
      return done(err)
    }
    return done(null, user)
  })
})

// Check weather the user authenticated
passport.checkAuthentication = function(req, res, next) {
  // if user is logged-in then pass on the request to the next function(controller's function)
  if(req.isAuthenticated()){
    return next()
  }

  // if user not found
  return res.redirect('/users/login')
}

passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()){
    // req.user contains the current signed in  user from the session cookie and we are just sending this to the local for views
    res.locals.user = req.user;
  }

  next();
}

module.exports = passport