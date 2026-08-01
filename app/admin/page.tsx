import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const allBooks = await db.select().from(books);
  const allUsers = await db.select().from(users);

  const pendingUsers = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"));

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-500">
          Welcome back! Here's an overview of your library.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">📚 Total Books</h3>
          <p className="mt-3 text-4xl font-bold">{allBooks.length}</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">👥 Total Users</h3>
          <p className="mt-3 text-4xl font-bold">{allUsers.length}</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">⏳ Pending Requests</h3>
          <p className="mt-3 text-4xl font-bold">{pendingUsers.length}</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm text-gray-500">📖 Borrowed Books</h3>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>
      </div>
    </section>
  );
};

export default Page;
