import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import ImageKit from "imagekit";

console.log("process.env.IMAGEKIT_PRIVATE_KEY",process.env.IMAGEKIT_PRIVATE_KEY)
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
export const getPosts = async(req,res) =>{
  const page = parseInt(req.query.page || 1)
  const limit = parseInt(req.query.limit || 5)
  const posts = await Post.find()
  .populate("user","username")
  .limit(limit)
  .skip((page-1)*limit)
  const totalPosts = await Post.countDocuments()
  const hasMore=  page * limit < totalPosts
  res.status(200).json({posts,hasMore}) 

}
export const getPost = async(req,res) =>{
      const post = await Post.findOne({slug:req.params.slug}).populate("user","username img")
    res.status(200).send(post) 

}
// export const createPost = async(req,res) =>{
//       console.log("CP",req.headers)
//       console.log("req",req.auth())
//       const clerkUserId = req.auth.userId;
//       if(!clerkUserId){
//             return res.status(401).json({message:"Not Authenticated!"})
//       }
//        const user = await User.findOne({ clerkUserId });

//       if (!user) {
//       return res.status(404).json("User not found!");
//       }
//       const newPost = new Post({user:user._id,...req.body})
//       const post = await newPost.save()
//       res.status(200).json(post)

// }
export const createPost = async (req, res) => {
  console.log("AUTH:", req.auth());

  const clerkUserId = req.auth().userId;
  console.log("clerkUserId",clerkUserId)

  if (!clerkUserId) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  const slug = req.body.title.replace(/ /g,"-").toLowerCase()
  let existingPost = await Post.findOne({slug})
  let counter = 2
  while(existingPost){
      slug = `${slug}-${counter}`
      existingPost = await Post.findOne({slug})
      counter++;
  }

  const newPost = new Post({ user: user._id,slug, ...req.body });
  const post = await newPost.save();
  res.status(200).json(post);
};

// export const createPost = async(req,res) =>{
//       const newPost = new Post(req.body)
//       const post = await newPost.save()
//       res.status(200).json(post)
// }

export const deletePost = async(req,res)=>{
      const clerkUserId = req.auth().userId;
      if(!clerkUserId){
            return res.status(401).json({message:"Not Authenticated!"})
      }
       const user = await User.findOne({ clerkUserId });
    const deletedPost = await Post.findByIdAndDelete({_id:req.params.id,user:user._id})
    if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }
      res.status(200).send("Post has been deleted")

}

export const uploadAuth = async(req,res)=>{
     
      try {
        const { token, expire, signature } = await imagekit.getAuthenticationParameters();
       
    res.status(200).json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
  } catch (err) {
    console.error("ImageKit Auth Error:", err);
    res.status(500).json({ message: "Failed to generate auth params" });
  }
}

