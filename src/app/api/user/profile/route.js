import { connection } from "@/dbConfig/config";
import { getTokenData } from "@/helpers/getToken";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";


connection()

export async function GET(request){
 try {
 
   const userId = await getTokenData(request)
   const user = await User.findOne({_id: userId}).select("-password")

   if(!user){
    return NextResponse.json({message: "User not found" , status:400})
   }
   
   return NextResponse.json({
    message: "User found", 
    data: user,
    status: 200,
 })
 } catch (error) {
    return NextResponse.json({
        error: error.message || 'An unknown error occurred',
     status: 500 });
 }
}