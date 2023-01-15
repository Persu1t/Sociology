const User = require('../models/user')

module.exports.profile = function(req,res){
  return res.render('profile',{
    title: 'Profile-page !'
  })
}


module.exports.signup = function(req,res){
  return res.render('user_signup',{
    title: 'Signup-page !'
  })
}

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
        if (err){
        console.log('User not found :( Error in sigining up')
        }
        return res.redirect('/')
      });
    }
    else{
      res.redirect('back')
    }
  })
}