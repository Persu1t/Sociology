const Post = require("../models/posts")
const User = require('../models/user')



module.exports.home = async function (req, res) {
  try {
    // Populate the user with each post
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: "comments",
        populate: {
          path: 'user'
        }
      })
    let users = await User.find({});
    return res.render('home', {
      title: 'Home-page',
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.error('error',err);
  }

}