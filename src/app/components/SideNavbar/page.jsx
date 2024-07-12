"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import { motion, useAnimationControls } from "framer-motion";


const SideNavbar = () => {
  const controls = useAnimationControls();

  
  const router = useRouter()
  const [clicked, setClicked] = useState(false)
    const [once, setOnce] = useState(true);
    const handleClick = () => {

      if(!clicked) controls.start("widen");
      else controls.start("initial")

      setClicked(!clicked)
    };
    useEffect(()=>{
      setTimeout(() => {
        setOnce(false);
      }, 3000);
    })
    const handleLogout = async ()=>{
      let a = await fetch("/api/user/logout", {method:"GET"}) 
      let res = await a.json()
      console.log(res.message);
      if(res.message === "Logout successful"){
          router.replace("/login")
      }
  }
  const pathname = usePathname();
  const [books, setbooks] = useState(false);
  useEffect(() => {
    setbooks(pathname === "/profile");
  }, [pathname]);

  return (
    <motion.div
    variants={{
      initial: {
        width: "100px",
      },
      widen: {
       width: "225px",
      },
    }}
    layout
    initial="initial"
    animate={controls}
    className="  bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg relative h-full ">
      <motion.img 
     
      src="/dash.svg" onClick={handleClick} className={clicked ? "hover:scale-125 cursor-pointer absolute z-10 top-2 right-[-20px]" : "hover:scale-125 cursor-pointer rotate-180 z-10 absolute top-2 right-[-20px]"} alt="" />
      <div className="mb-6 md:mb-0 p-4 pl-4 pt-4 ">
        <div className="flex  items-center gap-2">
          
          <span className={ clicked ? "inline-block text-xl text-white font-bold": "hidden"} >
          BookManager
          </span>
        </div>
      </div>
      <motion.ul 
      initial={{
        translateY: once? +850 :0,
        scale: once? 0.7: 1
    }}
    animate={{
      translateY: 0,
      scale: 1
    }}
    transition={{
      duration: .225,
      type: "spring",
      stiffness: 260,
      damping: 20 
     
    }}
      className=" md:pl-5 pt-[40px] flex flex-col items-start px-2 py-3 text-white text-xl gap-4 p-2">
        <motion.li
          className={
            books
              ? "rounded-full py-2 px-4 border-orange-400 border-4 box-border  bg-white text-orange-500 cursor-pointer"
              : "py-2 px-4 hover:border-orange-400  cursor-pointer bg-white text-orange-500"
          }
          whileTap={{
            
            scale: 1.02,
            rotate: "2.5deg",
            duration: 0.25,
          }}
          whileHover={{
            scale: 1.05
          }}
         
        >
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2">
            <span>
              <img src="/books.png" className="pb-1 w-6 h-6" alt="" />
            </span>
            <span className={ clicked ? "inline-block pr-1": "hidden"}>All Books</span>
          </Link>
        </motion.li>
       <motion.li 
       whileTap={{
        
        scale: 1.02,
        rotate: "2.5deg",
        duration: 0.25,
      }}
      whileHover={{
        scale: 1.05
      }}
       className={ 
        clicked ? "rounded-full w-40 py-2 px-4 hover:border-orange-400 border-4 box-border  bg-white text-orange-500 cursor-pointer": "rounded-full py-2 px-4 hover:border-orange-400 border-4 box-border  bg-white text-orange-500 cursor-pointer"
       } >
       <div className="flex items-center gap-3">
       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
        </svg>
              <span className={ clicked ? "inline-block": "hidden"}>Settings</span>
            </div>
       </motion.li>
       <motion.li 
       whileTap={{    
        scale: 1.02,
        rotate: "2.5deg",
        duration: 0.25,
      }}
      whileHover={{
        scale: 1.05
      }}
      className={ 
        clicked ? "rounded-full w-40 py-2 px-4 hover:border-orange-400 border-4 box-border  bg-white text-orange-500 cursor-pointer": "rounded-full py-2 px-4 hover:border-orange-400 border-4 box-border  bg-white text-orange-500 cursor-pointer"
       } >
       <div onClick={handleLogout} className="flex items-center gap-3 ">
       <svg fill="#000000" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"></path>
         </svg>
             <span className={ clicked ? "inline-block": "hidden"}>Logout</span> 
            </div>
       </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default SideNavbar;
