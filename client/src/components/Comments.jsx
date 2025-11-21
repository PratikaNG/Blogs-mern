import React from 'react'
import Comment from './Comment'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchComments = async(postId) =>{
    const slug = useParams()
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res.data
  }

const Comments = () => {
  
    const {isPending,error,data} = useQuery({
      queryKey:["comments",postId],
      queryFn:()=>fetchComments(postId)
    })
    if (isPending) return 'Loading...'
    
    if (error) return 'An error has occurred: ' + error.message
  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
      <h1 className='underline text-xl text-gray-500'>Comments</h1>
      <div className='flex items-center justify-between gap-8 w-full'>
        <textare placeholder="Write a comment..." className="w-full p-4 rounded-xl"/>
        <button className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </div>
      {data.map((item)=><Comment key={item._id} comment={item}/>)}
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </div>
  )
}

export default Comments
