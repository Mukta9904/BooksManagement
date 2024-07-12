"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { bookFormContext } from "@/context/context";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookForm = (props) => {
  const value = useContext(bookFormContext);
  const [form, setForm] = useState({
    bookTitle: props.bookTitle || "",
    authorName: props.authorName || "",
    publishYear: props.publishYear || "",
    bookGenre: props.bookGenre || "",
   
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (props.id) {
      const response = await fetch("/api/user/editBook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          bookTitle: form.bookTitle,
          authorName: form.authorName,
          publishYear: form.publishYear,
          bookGenre: form.bookGenre,
        }),
      });
    
      let a = await fetch("/api/user/getBooks", { method: "GET" });
      let r = await a.json();
      value.setBooks(r.data);
      value.show && value.setShow(!value.show)
      value.create && value.setCreate(!value.create)
      return;
    }
    const response = await fetch("/api/user/addBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let a = await fetch("/api/user/getBooks", { method: "GET" });
    let r = await a.json();
    value.setBooks(r.data);
    value.show && value.setShow(!value.show)
      value.create && value.setCreate(!value.create)
  };
 
  useEffect(() => {
    setForm({
      bookTitle: props.bookTitle || "",
      authorName: props.authorName || "",
      publishYear: props.publishYear || "",
      bookGenre: props.bookGenre || "",
      
    });
  }, [
    props.bookTitle,
    props.authorName,
    props.publishYear,
    props.bookGenre,
  ]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  return (
    <AnimatePresence>
  <motion.div
    initial={{ translateY: +230, scale: 0.7 }}
    animate={{ scale: 1, translateY: 0 }}
    exit={{ scale: 0.7, translateY: +230, duration: 0.125 }}
    transition={{ duration: 0.15, ease: "linear" }}
    layout
    className="flex lg:w-[550px] w-full max-h-[540px] sticky top-24 my-3 mx-3 transition-all rounded-[20px] bg-white shadow-lg"
  >
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 rounded-[20px] shadow-xl w-full max-w-2xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-900 font-semibold w-full text-center text-2xl py-3">
          {props.heading === "Edit" ? "Edit Book Details" : "Enter Book Details"}
        </h2>
        <button
          className={`bg-gray-500 shadow-md hover:bg-red-700 hover:scale-105 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${
            value && (value.show || value.create) ? "inline-block" : "hidden"
          }`}
          onClick={() => {
            value && value.show && value.setShow(false);
            value && value.create && value.setCreate(false);
          }}
        >
          Close
        </button>
      </div>

      {/* Book Title */}
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2">
          Book Title
        </label>
        <div className="relative">
          <input
            name="bookTitle"
            {...register("bookTitle", { required: "Book title is required" })}
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name of the book"
            onChange={handleChange}
            value={form.bookTitle}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={value && value.show ? "h-6 w-6 absolute z-10 top-2 right-2 hover:scale-110 hover:cursor-pointer" : "hidden"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth={2}
            onClick={() => {handleCopy(form.bookTitle)}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </div>
        {errors.bookTitle && (
          <div className="text-sm text-red-500">
            {errors.bookTitle.message}
          </div>
        )}
      </div>

      {/* Author Name */}
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2">
          Author Name
        </label>
        <div className="relative">
          <input
            name="authorName"
            {...register("authorName", { required: "Author Name is required" })}
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Writer's name"
            onChange={handleChange}
            value={form.authorName}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={value && value.show ? "h-6 w-6 absolute z-10 top-2 right-2 hover:scale-110 hover:cursor-pointer" : "hidden"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth={2}
            onClick={() => {handleCopy(form.authorName)}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </div>
        {errors.authorName && (
          <div className="text-sm text-red-500">
            {errors.authorName.message}
          </div>
        )}
      </div>

      {/* Publish Year */}
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2">
          Publish Year
        </label>
        <input
          name="publishYear"
          {...register("publishYear", { required: "Publish Year is required" })}
          className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="yyyy"
          onChange={handleChange}
          value={form.publishYear}
        />
        {errors.publishYear && (
          <div className="text-sm text-red-500">
            {errors.publishYear.message}
          </div>
        )}
      </div>

      {/* Book Genre */}
      <div className="mb-4">
        <label className="block text-gray-900 text-sm font-bold mb-2">
          Book Genre
        </label>
        <div className="relative">
          <input
            name="bookGenre"
            {...register("bookGenre", { required: "Book Genre is required" })}
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the genre"
            onChange={handleChange}
            value={form.bookGenre}
          />
        </div>
        {errors.bookGenre && (
          <div className="text-sm text-red-500">
            {errors.bookGenre.message}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center ">
        <button 
          type="submit"
          className="text-green-600 hover:scale-110  shadow-lg border-2 border-green-600 hover:bg-green-600 bg-white hover:text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  </motion.div>
</AnimatePresence>

  );
};

export default BookForm;
