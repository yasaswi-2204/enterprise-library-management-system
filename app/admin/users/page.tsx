import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import UserTable from "@/components/admin/UserTable";

const Page = async () => {
  const allUsers = await db.select().from(users);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">All Users</h1>
      <UserTable users={allUsers} />
    </div>
  );
};

export default Page;
