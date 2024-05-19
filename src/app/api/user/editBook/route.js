import { connection } from "@/dbConfig/config"; 
import { BooksFolder } from "@/models/userModel";
import { NextResponse } from "next/server"; 
import { getTokenData } from "@/helpers/getToken"; 

import { ObjectId } from 'mongodb'; 

connection()

export async function PUT(request) {
    try {
      const userId = await getTokenData(request)
      const reqBody = await request.json()
      const { id , bookTitle, authorName ,publishYear , bookGenre  } = reqBody;
     
      const booksFolder =  await BooksFolder.findOne({user: userId })

      const newBook = {

        bookTitle: bookTitle,

        authorName: authorName, 

        publishYear: publishYear,

        bookGenre: bookGenre

    }

      const objectId = typeof id === 'string' ? new ObjectId(id) : id; 

      const changeIdx = await booksFolder.storedBooks.findIndex(p => p._id.equals(objectId))

      if (changeIdx === -1) {
      return NextResponse.json({ message: "Book entry not found" , status: 400 });
    }

    booksFolder.storedBooks[changeIdx] = newBook
      await booksFolder.save()
      return NextResponse.json({ data: booksFolder.storedBooks , message : "Book data edited successfully" , status: 200})

    } catch (error) {
      return NextResponse.json({
        error: error.message || 'An unknown error occurred',
       status: 500 });
    }
  } 
