import { connection } from "@/dbConfig/config";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import { BooksFolder } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
connection();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, username, password } = reqBody;
    const existingUser = await User.findOne({ email }); // Renamed to avoid confusion

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" , status: 400 });
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const userData = await newUser.save();

    // Create empty folders for the books after the user has been created
    const booksFolder = new BooksFolder({ user: userData._id, storedbooks: [] });

    // Save the folder
    const booksFolderData = await booksFolder.save();

    // Update the user with references to the folders
    userData.booksFolder = booksFolderData._id;

    await userData.save(); 
    
    const tokenData = {
      id : newUser._id
     }
       const token = jwt.sign( tokenData , process.env.JWT_SECRET, { expiresIn: "2h" })
       const response = NextResponse.json({message:"User registered successfully", success:true, status: 200})
       response.cookies.set("token", token,{
          httpOnly: true
       })
       return response       
  } catch (error) {
    
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
     status: 500 });
  }
}
