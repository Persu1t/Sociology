const User = require('../models/user')



module.exports.profile = function(req,res){
  return res.render('profile',{
    title: 'Profile-page !'
  })
}


module.exports.signup = function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }

  return res.render('user_signup',{
    title: 'Signup-page !'
  })
}

// login page

module.exports.login = function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile')
  }
  return res.render('login',{
    title: 'login Page',
  })
};


// get signup data
module.exports.create = function(req,res){
  if (req.body.password!= req.body.confirm_password){
    return res.redirect('back')
  }

  User.findOne({email: req.body.email}, function(err, user){
    if (err){
      console.log('User not found :( Error in creating user while signup')
      return
    }
    if(!user){
      User.create(req.body, function(err, user){
        if (err){console.log('User not found :( Error in sigining up'); return}
        return res.redirect('/users/login')
      });
    }
    else{
      res.redirect('back')
    }
  })
}




module.exports.createSession = function(req, res){
  return res.redirect('/')
  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("Error in finding in signing in");
  //     return;
  //   }
  
  //   //Handle User found
  //   if (user) {
  //     //Handle password which doesn't match
  //     if (user.password != req.body.password) {
  //       return res.redirect("back");
  //     }
  
  //     //handle session creation
  //     res.cookie("user_id", user.id);
  //     // req.flash("success", "Logged in Successfully");
  //     return res.redirect("/");
  //   } else {
  //     //handle user not found
  //     return res.redirect("back");
  //   }
  // });
};

module.exports.destroySession = function(req,res){
  req.logout(function(err){
    if(err){
      console.log(err)
      return
    }
    return res.redirect("/");
  });
};

// app.post('/logout', function(req, res, next){
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

