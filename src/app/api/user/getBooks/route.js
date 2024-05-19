import { connection } from "@/dbConfig/config"; 
import { BooksFolder  } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 

connection();

export async function GET(request) {
    try {
      const userId = await getTokenData(request)
      const booksFolder =  await BooksFolder.findOne({user: userId })
      if(booksFolder.storedBooks.length !== -1){
          return NextResponse.json({data: booksFolder.storedBooks, meassage: "All Books Found",success:true, status:200 })
      }
          return NextResponse.json({message: "No Books found", status: 400})
    } catch (error) {
      return NextResponse.json({
        error: error.message || 'An unknown error occurred',
       status: 500 });
    }
  }