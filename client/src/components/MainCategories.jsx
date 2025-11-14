import { Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const MainCategories = () => {
  return (
    <div className='hidden md:flex justify-center items-center gap-8 rounded-2xl md:rounded-full p-4 bg-white'>
      <div className='flex-1 flex items-center justify-between flex-wrap'>
        <Link to="/posts" className='rounded-full bg-blue-800 px-4 py-2 text-white'>All Posts</Link>
        <Link to="/posts?cat=web-design" className='rounded-full hover:bg-blue-50 px-4 py-2 '>Web Design</Link>
        <Link to="/posts?cat=development" className='rounded-full hover:bg-blue-50 px-4 py-2 '>Development</Link>
        <Link to="/posts?cat=databases" className='rounded-full hover:bg-blue-50 px-4 py-2 '>Database</Link>
        <Link to="/posts?cat=seo" className='rounded-full hover:bg-blue-50 px-4 py-2 '>Search Engines</Link>
        <Link to="/posts?cat=marketing" className='rounded-full hover:bg-blue-50 px-4 py-2 '>Marketing</Link>
      </div>
      <span className='text-xl font-medium'>|</span>
      <div className='flex items-center gap-2 py-2 px-4 rounded-full bg-gray-100'>
        <span><Search/></span>
        <input type='text' placeholder='Search a post' className='bg-transparent p-1'/>
        </div>
    </div>
  )
}

export default MainCategories
