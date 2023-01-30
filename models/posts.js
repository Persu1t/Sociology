const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PATH = path.join('/uploads/users/posts')
const postSchema = new mongoose.Schema({
  content:{
    type:String,
    
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // include the array of ids of all the comments in this post schema itself
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  posts:{
    type: String,
  },
},{
  timestamps:true,
});


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname ,"..", POST_PATH))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

// static methods
postSchema.statics.uploadedPost = multer({storage: storage}).single('posts')
postSchema.statics.postPath = POST_PATH
const Post = mongoose.model('Post', postSchema);
module.exports = Post;