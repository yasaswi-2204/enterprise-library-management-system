import BookForm from "@/components/admin/forms/BookForm";
import { getBookById } from "@/lib/admin/actions/book";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const result = await getBookById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <>
      <Button asChild variant="ghost" className="mb-6 w-fit hover:bg-slate-100">
        <Link href="/admin/books">← Back</Link>
      </Button>

      <BookForm type="update" {...result.data} />
    </>
  );
};

export default Page;
