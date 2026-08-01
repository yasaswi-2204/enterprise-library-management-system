interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: Date | null;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  description: string;
  totalCopies: number;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
