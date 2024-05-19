import { connection } from "@/dbConfig/config";
import { NextResponse } from "next/server";


connection();

export async function GET(request) {
  try {
    
    const response = NextResponse.json({ message: "Logout successful", success: true , status : 200 });

    // Set the token cookie to an empty value with an expiry date in the past to invalidate it
  response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    });
    
    return response;
  } catch (error) {

    return NextResponse.json({
      error: error.message || 'An unknown error occurred', 
      status: 500 });
  }
}
