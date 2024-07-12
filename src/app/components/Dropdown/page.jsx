"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'
import { motion } from 'framer-motion'

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
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
    
    
    const handleLogout = async ()=>{
      let a = await fetch("/api/user/logout", {method:"GET"}) 
      let res = await a.json()
      console.log(res.message);
      if(res.message === "Logout successful"){
          router.replace("/login")
      }
  }
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const menuVariants = {
      open: {
        opacity: 1,
        scale: 1,
        display: "block",
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      },
      closed: {
        opacity: 0,
        scale: 0.95,
        transitionEnd: {
          display: "none"
        }
      }
    };
  
    return (
      <div className="inline-block fixed top-2 right-2 text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={toggleDropdown}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12H6.01M12 12H12.01M18 12H18.01M6 18H6.01M12 18H12.01M18 18H18.01M6 6H6.01M12 6H12.01M18 6H18.01" />
            </svg>
          </button>
        </div>
  
        <motion.div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <div className="py-1">
            <div  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 19.121a3 3 0 010-4.242l1.414-1.414a3 3 0 014.242 0l1.414 1.414a3 3 0 004.242 0l1.414-1.414a3 3 0 010-4.242l1.414-1.414a3 3 0 000-4.242l-1.414-1.414a3 3 0 00-4.242 0l-1.414 1.414a3 3 0 01-4.242 0L5.121 2.636a3 3 0 00-4.242 4.242l1.414 1.414a3 3 0 010 4.242l-1.414 1.414a3 3 0 000 4.242l1.414 1.414a3 3 0 004.242 0l1.414-1.414a3 3 0 014.242 0l1.414 1.414a3 3 0 004.242 0l1.414-1.414a3 3 0 000-4.242l-1.414-1.414a3 3 0 00-4.242 0l-1.414 1.414a3 3 0 01-4.242 0L5.121 19.121z" />
              </svg>
              {user?.username}
            </div>
            <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5m0 0v6m0 0H12z" />
              </svg>
              Settings
            </div>
            <div onClick={handleLogout} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h3m-3 4h3m-6-8h3M3 6h15M3 6v12m0-12l3 3m-3-3h6m-6 0v12m0 0l3-3m-3 3h6m-6 0v-8m0 8l3-3" />
              </svg>
              Logout
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  export default Dropdown