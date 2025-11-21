import React from 'react'
import PostListItem from './PostListItem'
import { useQuery } from '@tanstack/react-query'
import axios from "axios"


const PostList = () => {
  const fetchPosts = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
  return res.data
}
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>fetchPosts(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  console.log("data",data)
  return (
    <div className='flex flex-col gap-4 mb-8'>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
    </div>
  )
}

export default PostList
