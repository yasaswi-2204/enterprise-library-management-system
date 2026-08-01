import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import BookTable from "@/components/admin/BookTable";
import { ilike, or } from "drizzle-orm";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const { search = "" } = await searchParams;

  const allBooks =
    search.trim() === ""
      ? await db.select().from(books)
      : await db
          .select()
          .from(books)
          .where(
            or(
              ilike(books.title, `%${search}%`),
              ilike(books.author, `%${search}%`),
              ilike(books.genre, `%${search}%`),
            ),
          );

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">All Books</h2>

        <div className="flex items-center gap-3">
          <form>
            <input
              name="search"
              defaultValue={search}
              placeholder="Search books..."
              className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary-admin"
            />
          </form>

          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-7">
        <BookTable books={allBooks} />
      </div>
    </section>
  );
};

export default Page;
