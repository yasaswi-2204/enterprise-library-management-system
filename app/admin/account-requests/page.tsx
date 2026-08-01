import UserTable from "@/components/admin/UserTable";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const pendingUsers = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"));

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Account Requests</h1>

      <UserTable users={pendingUsers} />
    </div>
  );
};

export default Page;
