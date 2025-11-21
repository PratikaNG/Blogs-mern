import React from 'react'
import IkImage from './IkImage'
import {format} from "timeago.js"

const Comment = ({comment}) => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
        <div className='flex items-center gap-4'>
            <IkImage src="userImg.jpeg" className="w-10 h-10 rounded-full object-cover" w="40"/>
            {/* {comment.user.img && <IkImage src={comment.user.img} className="w-10 h-10 rounded-full object-cover" w="40"/>} */}
            <span className='font-medium'>John Doe</span>
            <span className='font-medium'>{comment.user.username}</span>
            <span className="text-sm text-gray-500">2 days ago</span>
        {/* <span>{format(post.createdAt)}</span> */}

        </div>
        <div className='mt-4'>
          {/* {comment.desc} */}
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam hic debitis expedita unde minus ex, ipsum voluptatibus illum quae temporibus officia beatae nulla! Provident dolor nostrum quidem id earum veniam?</p>    
         </div>
      
    </div>
  )
}

export default Comment
