import React from 'react'
import Comment from './Comment'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {useAuth,useUser} from "@clerk/clerk-react"

const fetchComments = async(postId) =>{
    const slug = useParams()
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
    return res.data
  }

const Comments = () => {
  const user = useUser()
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();
    const {isPending,error,data} = useQuery({
      queryKey:["comments",postId],
      queryFn:()=>fetchComments(postId)
    })
    if (isPending) return 'Loading...'
    
    if (error) return 'An error has occurred: ' + error.message

    const queryClient = useQueryClient()

    const mutation = useMutation({
    mutationFn: async (newComment) => {
      console.log("newComment", newComment);
      const token = await getToken();
      console.log("token", token);

      return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["comments",postId]})
    },
    onError:(err)=>{
      toast.error(err.response.data)
    }
  });

   const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = {
      desc:formData.get("desc")
    }

    mutation.mutate(data)
  }

  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='underline text-xl text-gray-500'>Comments</h1>
      <form onSubmit={handleSubmit} className='flex items-center justify-between gap-8 w-full'>
        <textare name='desc' placeholder="Write a comment..." className="w-full p-4 rounded-xl"/>
        <button type='submit' className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl">
          Send
        </button>
      </form>
      {isPending ? "Loading..." : error ? "Error loading comments!" : 
      <>
      {mutation.isPaused && (<Comment comment={{desc:`${mutation.variables.desc} (Sending...)`,
      createdAt:new Date.now(),
      user:{
        img:user.imageUrl,
        username:user.username
      }
      }}/>)}
      {data.map((item)=><Comment key={item._id} comment={item}/>)}
      </>
      }
      
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </div>
  )
}

export default Comments
