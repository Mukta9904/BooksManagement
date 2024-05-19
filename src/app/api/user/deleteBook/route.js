import { connection } from "@/dbConfig/config"; 
import { BooksFolder } from "@/models/userModel"; 
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 
import { ObjectId } from 'mongodb'; 
connection();

export async function DELETE(request) {
  try {
    const userId = await getTokenData(request)
    const reqBody = await request.json();
    const { id } = reqBody;
    const booksFolder =  await BooksFolder.findOne({user: userId })

    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
     
    booksFolder.storedBooks = await booksFolder.storedBooks.filter(p => !p._id.equals(objectId)) 

    await booksFolder.save()

    return NextResponse.json({data: booksFolder.storedBooks, message: "Book data deleted successfully" , status: 200});
  } catch (error) {
     
    return NextResponse.json({
      error: error.message || 'An unknown error occurred',
     status: 500 });
  }
} 