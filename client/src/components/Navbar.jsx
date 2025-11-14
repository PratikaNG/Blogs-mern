import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import IkImage from './IkImage'
import { Link } from 'react-router'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
const Navbar = () => {

    const [open,setOpen] = useState(false)
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
      {/* Logo */}
      <Link to="/" className='flex items-center gap-4 text-2xl font-bold'>
         {/* <Image  src='/logo.png' alt='logo' className='w-8 h-8'/> */}
         <IkImage src="/logo.png" alt="NG logo" w={32} h={32} />
        <span>NG blogs</span>
      </Link>
      {/* Mobile Menu */}
      <div className='md:hidden'>
        {/* Mobile Menu Button */}
        <div className='cursor-pointer' onClick={()=>{setOpen((prev)=>!prev)}}>
            {open ? <X /> : <Menu />}
        </div>
        {/* Mobile Link List */}
        <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg  transition-all ease-in-out absolute top-16 ${open ? "-right-0" : "-right-[100%]"} `}>
            <Link to='/'>Home</Link>
            <Link to='/'>Trending</Link>
            <Link to='/'>Most Popular</Link>
            <Link to='/'>About</Link>
            <Link to='/'><button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login</button></Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
        <Link to='/'>Home</Link>
        <Link to='/'>Trending</Link>
        <Link to='/'>Most Popular</Link>
        <Link to='/'>About</Link>
        <SignedOut>
            <Link to='/login'>
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
                Login
            </button></Link>

      </SignedOut>
      <SignedIn>
            {/* <Link to='/'>
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>
                Sign In
            </button>
            </Link> */}
            <UserButton/>
            
      </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
