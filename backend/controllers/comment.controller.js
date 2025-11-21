import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"

export const getPostComments = async(req,res)=>{
    const comments = await Comment.find({post:req.params.postId})
    .populate("user","username img")
    .sort({createdAt:-1})  //latest first

    res.json(comments)

}
export const addComment = async(req,res)=>{
    const clerkUserId = req.auth().userId
    const postId = req.params.postId
     if (!clerkUserId) {
        return res.status(401).json({ message: "Not Authenticated!" });
      }
    
      const user = await User.findOne({ clerkUserId });
    
      if (!user) {
        return res.status(404).json("User not found!");
      }

      const newComment = new Comment({...req,body,user:user._id,post:postId})

      const savedComments = await newComment.save()
      res.status(200).json({savedComments})
}
export const deleteComment = async(req,res)=>{
const clerkUserId = req.auth().userId
    const id = req.params.id
     if (!clerkUserId) {
        return res.status(401).json({ message: "Not Authenticated!" });
      }
    
      const user = await User.findOne({ clerkUserId });
    
      if (!user) {
        return res.status(404).json("User not found!");
      }

      const deletedComment = await Comment.findOneAndDelete({_id:id,user:user._id})

      if(!deletedComment){
        res.status(403).json("You can delete your comment only")
      }

      res.status(200).json("Comment deleted")

}