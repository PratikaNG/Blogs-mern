import dotenv from "dotenv/config"
// dotenv.config()
import express from "express"
import userRouter from "./routes/user.route.js"
import postsRouter from "./routes/post.route.js"
import commentsRouter from "./routes/comment.route.js"
import connectDB from "./lib/connectDB.js"
import webhooksRouter from "./routes/webhooks.route.js"
import {clerkMiddleware, requireAuth} from '@clerk/express'
import cors from "cors"

const port = process.env.PORT || 3001;
const app = express()
app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware());
app.use("/webhooks",webhooksRouter)
connectDB()

app.use(express.json())
// app.get("/test",(req,res)=>{
//   res.status(200).send("it works!")
// })
// app.get("/auth-state", (req, res) => {
//   const authState = req.auth();
//   res.json(authState);
// });

// app.get("/protect",(req,res)=>{
//   const {userId} = req.auth()
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// })
// app.get("/protect2",requireAuth(),(req,res)=>{
  
//   res.status(200).json("content")
// })


app.use("/users",userRouter)
app.use("/posts",postsRouter)
app.use("/comments",commentsRouter)

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(port,()=>{
    console.log(`App is listening to ${port}`)
})

