"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook, returnBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  hasBorrowed: boolean;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  hasBorrowed,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!hasBorrowed && !isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    setBorrowing(true);

    try {
      const result = hasBorrowed
        ? await returnBook({ bookId, userId })
        : await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: "Success",
          description: hasBorrowed
            ? "Book returned successfully"
            : "Book borrowed successfully",
        });

        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing
          ? hasBorrowed
            ? "Returning..."
            : "Borrowing..."
          : hasBorrowed
            ? "Return Book"
            : "Borrow Book"}
      </p>
    </Button>
  );
};
export default BorrowBook;
