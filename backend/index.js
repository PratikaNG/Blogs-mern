dotenv.config()
import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import postsRouter from "./routes/post.route.js"
import commentsRouter from "./routes/comment.route.js"
import connectDB from "./lib/connectDB.js"

const app = express()
const port = process.env.PORT || 3001;
connectDB()

app.get("/test",(req,res)=>{
  res.status(200).send("it works!")
})

app.use("/users",userRouter)
app.use("/posts",postsRouter)
app.use("/comments",commentsRouter)

app.listen(port,()=>{
    console.log(`App is listening to ${port}`)
})

