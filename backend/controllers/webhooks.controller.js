import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  console.log("Data",evt.data);

  if (evt.type === "user.created") {
    console.log("user.created")
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }

  // if (evt.type === "user.deleted") {
  //   const deletedUser = await User.findOneAndDelete({
  //     clerkUserId: evt.data.id,
  //   });

  //   await Post.deleteMany({user:deletedUser._id})
  //   await Comment.deleteMany({user:deletedUser._id})
  // }

  // return res.status(200).json({
  //   message: "Webhook received",
  // });
};

// import { Webhook } from "svix";
// import User from "../models/user.model.js";
// import Post from "../models/post.model.js";
// import Comment from "../models/comment.model.js";

// export const clerkWebhook = async(req,res)=>{
    
// const webHookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
// if(!webHookSecret){
//     throw new Error("Webhook secret needed!")
// }
// const payload = req.body;
//     const headers = req.headers;

//     const wh = new Webhook(webHookSecret);
//     let event;
//     try {
//         event = wh.verify(payload, headers);
//     } catch (err) {
//         res.status(400).json({message:"Webhook verification failed!"});
//     }
//   console.log('userId:', event.data)


//    if (event.type === 'user.created') {
//     const newUser = new User({
//         clerkUserId:event.data.id,
//         username:event.data.username || event.data.email_addresses[0].email_address,
//         email:event.data.email_addresses[0].email_address,
//         img:event.data.profile_image_url
//     })
//     await newUser.save();
// }
// if (evt.type === "user.deleted") {
//     const deletedUser = await User.findOneAndDelete({
//       clerkUserId: evt.data.id,
//     });

//     await Post.deleteMany({user:deletedUser._id})
//     await Comment.deleteMany({user:deletedUser._id})
//   }

//   return res.status(200).json({
//     message: "Webhook received",
//   });

// }