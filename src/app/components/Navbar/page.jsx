"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import WelcomePopup from '../WelcomePopup/page'

const Navbar = () => {
  const [user, setuser] = useState({})
   
  useEffect ( () => {
    async function fetchData() {
      let a = await fetch("/api/user/profile", { method: "GET" });
      let res = await a.json();
      console.log(res.message);
      setuser(res.data)
    }
    fetchData();
  }, []);
      
  return (
    <div>
     { user && <WelcomePopup username={user?.username} />}
      <nav className=' flex justify-between items-center relative text-gray-700 font-bold px-5 py-2'>
        <h1 className='text-2xl  text-white hidden sm:inline-block'>Dashboard</h1>
        <div  className="flex items-center px-4 py-2 gap-2 text-sm bg-white rounded-full text-gray-700 hover:bg-gray-100">
        <img src="/profile.svg" alt="profile" />
              {user?.username}
            </div>
    </nav>
    <div className="w-[100%] h-[1px] bg-white opacity-50"></div>
    </div>
  )
}

export default Navbar
