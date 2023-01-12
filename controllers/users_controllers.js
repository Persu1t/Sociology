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