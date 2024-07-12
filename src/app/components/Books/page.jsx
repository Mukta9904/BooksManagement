"use client"
import React from 'react'
import BookForm from '../saveBooks/page';
import { motion, AnimatePresence } from 'framer-motion';
import { useState , useEffect} from 'react'
import { bookFormContext } from "@/context/context";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [once, setOnce] = useState(true);
  const [showbooks, setshowBooks] = useState({});
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [flex, setFlex] = useState(true)
  
  const handleView = ()=>{
     setFlex(!flex)
  }
  useEffect(() => {
    async function fetchData() {
      let a = await fetch("/api/user/getBooks", { method: "GET" });
      let res = await a.json();
      console.log(res.data);
      setBooks(res.data);
    }
    fetchData();
    setTimeout(() => {
      setOnce(false);
    }, 3000);
  }, []);

  const handleShow = (obj) => {
    setshowBooks(obj);
    setShow(!show);
    setCreate(false);
  };

  const handleDelete = async (obj) => {
    await fetch("/api/user/deleteBook", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: obj._id ? obj._id : obj.id }),
    });

    let r = await fetch("/api/user/getBooks", { method: "GET" });
    let res = await r.json();
    setBooks(res.data);
  }

  return (
    <bookFormContext.Provider
      value={{ books, setBooks, create, setCreate, show, setShow }}
    >
      <div className=" w-full h-[90vh] overflow-auto">
        <div className="flex p-3 sticky top-0 z-10 bg-gradient-to-br from-indigo-800 from-20% via-sky-900 via-50% to-emerald-600 to-100% backdrop-blur-sm backdrop-filter  text-3xl  font-semibold justify-between items-center">
          <span
          // className='hover:underline underline-offset-4 duration-200 decoration-green-400'
          >Saved Books</span>
           
          
          <span

            onClick={() => {
              setCreate(!create), setShow(false);
            }}
            className=" cursor-pointer "
          >
            <motion.img 
            whileTap={{
              scale: 1.02,
              rotate: "2.5deg",
              duration: 0.25,
            }}
            whileHover={{
              scale: 1.05
            }}
            src="/create.svg" alt="" />
          </span>
        </div>
        <div className='lg:flex gap-2 hidden  items-start py-3 px-4'>
          <span className='font-bold text-2xl '>View:</span>
            <div onClick={handleView} className={`flex w-10 h-10 rounded-md cursor-pointer ${flex? "bg-gray-800": ""} bg-white items-center justify-center`} >
            <img src="/list-view.svg" className={flex? "invert" : ""} alt="" />
            </div>
            <div onClick={handleView} className={`flex w-10 h-10 rounded-md cursor-pointer ${flex? "": "bg-gray-800"} bg-white items-center justify-center`}>
            <img src="/grid-view.svg" className={flex? "" : "invert"} alt="" />
              </div>
           </div>
        <div className="flex ">
          <motion.div
            className={`${flex ? "flex flex-col": "lg:grid lg:grid-cols-3 " } w-full sm:w-[80%] sm:ml-5  ${
              show || create ? "hidden md:flex sm:flex-col " : "flex flex-col"
            }`}
          >
            {books &&
              books.map((user) => {
                return (
                  <motion.div
                  initial={{
                      translateY: once? +300 :0,
                      scale: once? 0.7: 1
                  }}
                  animate={{
                    translateY: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: .125,
                    type: "spring",
                    stiffness: 260,
                    damping: 20 
                   
                  }}
                  whileHover={{
                    
                    scale: 1.02,
                    translateX: -5,
                    translateY: -5
                  }}
                  whileTap={{
                    
                  }}
                    onClick={(e) => {
                      handleShow(user), e.stopPropagation();
                    }}
                    key={user._id || user.id}
                    className={`cursor-pointer  flex items-center justify-between hover:bg-sky-400 bg-white py-2 px-6 rounded-[10px] shadow-lg m-3 ${
                      show || create ? "hidden md:flex" : ""
                    } `}
                  >
                    <div className="w-full">
                      <h2 className="text-black text-lg font-semibold mb-2">
                        {user.bookTitle}
                      </h2>
                      <div className="w-[98%]  h-[1px] opacity-40 bg-black"></div>
                      <p className="mb-2">
                        <span className="text-black text-md">{user.authorName}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                    <img
                        src="/edit.svg"
                        onClick={() => {
                          setShow(!show);
                        }}
                        className=" hover:border hover:border-black rounded-lg cursor-pointer"
                        alt=""
                      />
                      <img
                        src="/delete.svg"
                        onClick={(e) => {
                          handleDelete(user), e.stopPropagation();
                        }}
                        className=" hover:border hover:border-black rounded-lg cursor-pointer"
                        alt=""
                      />
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
          <AnimatePresence>

          {create && (
            <BookForm
             className="absolute top-10 h-auto right-[20px] " />
          )}
          {show && (
            <BookForm
              id={ showbooks._id || showbooks.id }
              bookTitle={ showbooks.bookTitle }
              authorName={ showbooks.authorName }
              publishYear={ showbooks.publishYear }
              bookGenre={ showbooks.bookGenre }
              heading="Edit"
              className="absolute w-[600px] h-auto right-[20px]"
            />
          )}
          </AnimatePresence>
        </div>
      </div>
      </bookFormContext.Provider>
  )
}

export default Books
