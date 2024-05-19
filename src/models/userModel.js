import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: { value: true, message: "Email is required" },
  },
  username: {
    type: String,
    required: { value: true, message: "Username is required" },
  },
  password: {
    type: String,
    required: { value: true, message: "Password is required" },
  },
  booksFolder: {
    type: Schema.Types.ObjectId,
    ref: 'BooksFolder'
  }
});

// Books Folder Schema
const booksFolderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storedBooks: [{
    bookTitle:{ type: String, required: true },
    authorName: { type: String, required: true },
    bookGenre: { type: String, required: true }, 
    publishYear: { type: String, required: true },  
  }]
});

const User = mongoose.models.bookUsers || mongoose.model("bookUsers", userSchema);
const BooksFolder = mongoose.models.BooksFolder || mongoose.model('BooksFolder', booksFolderSchema);

export { User, BooksFolder };


