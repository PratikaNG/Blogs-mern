import React from 'react'
import { Link } from 'react-router'
import MainCategories from '../components/MainCategories'
import FeaturedPosts from '../components/FeaturedPosts'
import PostList from '../components/PostList'

const HomePage = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/*  BreadCrumbs*/}
      <div className='flex gap-4'>
        <Link to="/">Home</Link>
        <span>*</span>
        <span className='text-blue-800'>Blogs and Articles</span>
      </div>
      {/* Introduction */}
      <div className='flex items-center'>
        {/* Titles */}
        <div className=''>
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h1>
          <p className='mt-8 text-md md:text-xl'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
             Doloribus ipsam deserunt repellendus, corporis commodi error, provident harum, ipsa et necessitatibus dolor quaerat nostrum magnam obcaecati deleniti facilis non at odit!</p>
        </div>
        {/* Animated button */}
        <Link to="/write" className='relative hidden sm:block'>
        <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest"
            // className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className='absolute top-0 bottom-0 right-0 left-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white"
            stroke-width="2" 
            className="lucide lucide-move-up-right-icon lucide-move-up-right">
              <path d="M13 5H19V11"/><path d="M19 5L5 19"/></svg>
          </button>
        </Link>
      </div>
      {/* Categories */}
      <MainCategories/>
      {/* Featured Posts */}
      <FeaturedPosts/>
      {/* Post list */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  )
}

export default HomePage
