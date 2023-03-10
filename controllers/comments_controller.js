const Comment = require('../models/comment')
const Post = require('../models/posts')


module.exports.create = async function(req, res){
  try {
    let post = await Post.findById(req.body.post)
    if(post){
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user:req.user._id,
      })
      post.comments.push(comment);
      post.save();

      if(req.xhr){
        comment = await comment.populate([{ path: 'user', select: 'name email' }]);
    
        return res.status(200).json({
            data: {
                comment: comment
            },
            message: "Post created!"
        });
      }
      req.flash('success', 'Comment added Successfully!')
      res.redirect('/')
    }
  }catch(err){
    console.log('error',err)
    return
  }
}

module.exports.destroy = async function(req, res) {
  try{
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.user.id) {
      let postId = comment.post
      comment.remove();
  
      let post = Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}})
      if (req.xhr){
        return res.status(200).json({
            data: {
                comment_id: req.params.id
            },
            message: "Post deleted"
        });
      }
      req.flash('success', 'Comment deleted Successfully!')
      return res.redirect('back')
    }else{
      return res.redirect('back')
    }
  }catch(err){
    console.log('error',err)
    return
  }
}
