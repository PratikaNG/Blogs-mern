import React from 'react'
import PostListItem from './PostListItem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"

const PostList = (pageParam) => {
  const fetchPosts = async()=>{
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
    params:{page:pageParam}
  })
  return res.data
}
   const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: (pageParam = 1)=>fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })

  console.log("data",data)
  if (status === "loading") return 'Loading...'
  
  if (error) return 'An error has occurred: ' + error.message
  const allPosts = data.pages.flatMap((page)=>page.posts) || []
  console.log("data",data)
  return (
    <div className='flex flex-col gap-4 mb-8'>
      <InfiniteScroll
  dataLength={allPosts.length} //This is important field to render the next data
  next={fetchNextPage}
  hasMore={!hasNextPage}
  loader={<h4>Loading more posts...</h4>}
  endMessage={
    <p>
      <b>All posts loaded!</b>
    </p>
  }
>

      {allPosts.map((item)=><PostListItem key={item._id} post={item}/>)}</InfiniteScroll>
      
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
