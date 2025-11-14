import React from 'react'
import IkImage from './IkImage'
import { Link } from 'react-router'

const PostListItem = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-8'>
      {/* image */}
      <div className='md:hidden lg:block lg:w-1/3'> 
        <IkImage src="postImg.jpeg" className="rounded-2xl object-cover" w="735"/>
      </div>
      {/* details */}
      <div className='flex flex-col gap-4 lg:w-2/3'>
        <Link to="test" className='text-4xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Link>
      <div className='flex items-center gap-2 text-gray-500 text-sm'>
        <span>Written By</span>
        <Link className='text-blue-800'>John Doe</Link>
        <span>on</span>
        <Link className='text-blue-800'>Web Design</Link>
        <span>2 days ago</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptatum, perferendis veritatis officiis nostrum repudiandae corrupti quod suscipit nam dolor illo fugiat eum repellendus assumenda, iusto minus corporis debitis in?</p>
    <Link to="test" className='underline text-blue-800 text-sm'>Read more</Link>
    </div>
    </div>
  )
}

export default PostListItem
