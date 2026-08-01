"use client";

import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import { books } from "@/database/schema";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
type Book = InferSelectModel<typeof books>;

const BookTable = ({ books }: { books: Book[] }) => {
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${title}"?`,
    );

    if (!confirmed) return;

    const result = await deleteBook(id);

    if (result.success) {
      toast({
        title: "Success",
        description: `"${title}" was deleted successfully.`,
      });

      router.refresh();
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Title</th>
            <th className="px-6 py-4 text-left">Author</th>
            <th className="px-6 py-4 text-left">Genre</th>
            <th className="px-6 py-4 text-left">Available</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-left">Rating</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-t">
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">{book.genre}</td>
              <td className="px-6 py-4">{book.availableCopies}</td>
              <td className="px-6 py-4">{book.totalCopies}</td>
              <td className="px-6 py-4">{book.rating}</td>

              <td className="px-6 py-4">
                <Link
                  href={`/admin/books/${book.id}`}
                  className="text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800"
                >
                  Edit
                </Link>

                <span className="mx-2 text-gray-400">|</span>

                <button
                  onClick={() => handleDelete(book.id, book.title)}
                  className="text-red-600 underline underline-offset-2 transition-colors hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
