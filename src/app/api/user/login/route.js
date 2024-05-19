import { connection } from "@/dbConfig/config";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";

connection()

export async function POST(request){
  try {
    const reqBody = await request.json()
    const {email,password} = reqBody
    const user = await User.findOne({email})
    
    if(!user){
        return NextResponse.json({message: "Email doesn't exist", status:400})
    }   
    const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password", status: 400})
        }
       const tokenData = {
        id : user._id,
       }
         const token = jwt.sign( tokenData , process.env.JWT_SECRET, { expiresIn: "2h" })
         const response = NextResponse.json({message:"User logged in", status:200 , success:true})
         response.cookies.set("token", token,{
            httpOnly: true
         })
         return response       
    
  } catch (error) {
    return NextResponse.json({
        error: error.message || 'An unknown error occurred'
    , status: 500 });
  }

}
