const Post = require("../models/posts")
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',169)
  // Post.find({}, function (err, posts) {
  //   return res.render('home', {
  //     title: 'Home-page',
  //     posts: posts
  //   });
  // })

  // Populate the user with each post
  Post.find({})
  .populate('user')
  .populate({
    path:"comments",
    populate:{
      path: 'user'
    }
  })
  .exec(function (err, posts) {
    return res.render('home', {
      title: 'Home-page',
      posts: posts
    });
  });
}