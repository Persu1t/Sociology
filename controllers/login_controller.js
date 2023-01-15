module.exports.login = function(req, res){
  return res.render('login',{
    title: 'login Page',
  })
};

module.exports.createSession = function(req, res){
  // TODO LATER
}