import { connection } from "@/dbConfig/config";
import { BooksFolder } from "@/models/userModel";
import { NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getToken";

connection();

export async function POST(request) {
  try {
    const userId = await getTokenData(request);
    const reqBody = await request.json();
    const newBook = reqBody;
    
    const booksFolder = await BooksFolder.findOne({ user: userId });

    await booksFolder.storedBooks.push(newBook);
    await booksFolder.save();

    return NextResponse.json({ data: booksFolder.storedBooks , message: "Book data added successfully" , status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message || "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
