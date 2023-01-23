const User = require('../models/user')


// lets keep it same as before
module.exports.profile = function(req,res){
  User.findById(req.params.id, function(err, user){
    return res.render('profile',{
      title: 'Profile-page !',
      profile_user: user
    })
  });
  
}


module.exports.update = function(req, res,){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
      return res.redirect('back');
    })
  }else{
    return res.status(401).send('Unauthorized')
  }
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
module.exports.create = async function(req,res){
  if (req.body.password!= req.body.confirm_password){
    return res.redirect('back')
  }

  let user = await User.findOne({email: req.body.email})
  if(!user){
    await User.create(req.body);
    req.flash('success', 'Account made successfully! Please login again to see your account')
    return res.redirect('/users/login')
  }
  else{
    res.redirect('back')
  }
}




module.exports.createSession = function(req, res){
  req.flash('success','Logged in successfully')
  return res.redirect('/')
};

module.exports.destroySession = function(req,res){
  req.logout(function(err){
    if(err){
      console.log(err)
      return
    }
    req.flash('success','Logged out successfully')
    return res.redirect("/");
  });
};


