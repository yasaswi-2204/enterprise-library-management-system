"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const getBookById = async (id: string) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id));

    return {
      success: true,
      data: book[0],
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

export const updateBook = async (id: string, params: BookParams) => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
      })
      .where(eq(books.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while updating the book",
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    await db.delete(books).where(eq(books.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to delete book.",
    };
  }
};
