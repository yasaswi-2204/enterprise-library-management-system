"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateUserStatus } from "@/lib/actions/auth";
import { InferSelectModel } from "drizzle-orm";
import { users as usersTable } from "@/database/schema";
import config from "@/lib/config";

type User = InferSelectModel<typeof usersTable>;

const UserTable = ({ users }: { users: User[] }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">University ID</th>
              <th className="px-6 py-4 text-left">ID Card</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.fullName}</td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">{user.universityId}</td>

                <td className="px-6 py-4">
                  <a
                    href={`${config.env.imagekit.urlEndpoint}${user.universityCard}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`${config.env.imagekit.urlEndpoint}${user.universityCard}`}
                      alt="University ID"
                      className="h-16 w-28 rounded-lg border border-slate-200 object-cover shadow transition duration-200 hover:scale-110 hover:shadow-lg"
                    />
                  </a>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : user.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 disabled:opacity-50"
                        disabled={isPending}
                        onClick={() =>
                          startTransition(async () => {
                            const result = await updateUserStatus(
                              user.id,
                              "APPROVED",
                            );

                            if (result.success) {
                              router.refresh();
                            } else {
                              alert(result.error);
                            }
                          })
                        }
                      >
                        {isPending ? "Approving..." : "Approve"}
                      </button>

                      <button
                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                        disabled={isPending}
                        onClick={() =>
                          startTransition(async () => {
                            const result = await updateUserStatus(
                              user.id,
                              "REJECTED",
                            );

                            if (result.success) {
                              router.refresh();
                            } else {
                              alert(result.error);
                            }
                          })
                        }
                      >
                        {isPending ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
