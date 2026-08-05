# 📚 Enterprise Library Management System

A modern full-stack Library Management System built with **Next.js**, **TypeScript**, **PostgreSQL**, and **Drizzle ORM**. The platform enables students to browse books, request library accounts, and borrow books while providing administrators with a powerful dashboard to manage books, users, and account approvals.

---

## 🚀 Features

### 👨‍🎓 User Features

- Secure authentication and authorization
- User registration with University ID card upload
- Browse available books
- Search books by title, author, or genre
- View detailed book information
- Borrow available books
- Personalized user profile

---

### 👨‍💼 Admin Features

- Interactive Admin Dashboard
- Manage library books
  - Add new books
  - Update existing books
  - Delete books
- View all registered users
- Review pending account requests
- View uploaded University ID card thumbnails
- Approve or reject user registrations
- Dashboard statistics
  - Total Books
  - Total Users
  - Pending Requests
  - Approved Users

---

## 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

### Backend

- Next.js Server Actions
- Drizzle ORM
- PostgreSQL (Neon Database)

### Authentication

- NextAuth.js

### Image Storage

- ImageKit

### Database

- PostgreSQL

---

## 📂 Project Structure

```
app/
│
├── admin/
│   ├── books/
│   ├── users/
│   ├── account-requests/
│   └── dashboard/
│
├── api/
├── (auth)/
├── (root)/
│
components/
database/
lib/
styles/
```

---

## 📊 Admin Dashboard

The admin dashboard provides an overview of the entire library.

- 📚 Total Books
- 👥 Total Users
- ⏳ Pending Requests
- ✅ Approved Users

Administrators can efficiently manage books and approve new users after verifying uploaded university ID cards.

---

## 🔐 Authentication Flow

1. User registers.
2. Uploads University ID card.
3. Account status is set to **Pending**.
4. Admin reviews the uploaded ID.
5. Admin approves or rejects the request.
6. Approved users gain access to library features.

---

## 📸 University ID Verification

During registration, every user uploads a university ID card.

Administrators can:

- View uploaded ID thumbnails
- Open the full-size ID image
- Approve genuine users
- Reject invalid registrations

---

## 📖 Book Management

Administrators can:

- Add books
- Edit book information
- Delete books
- Manage available copies
- Track total copies

---

## 🗄 Database

The application uses **PostgreSQL** with **Drizzle ORM**.

Major entities include:

- Users
- Books
- Borrow Records

---

## 💡 Future Improvements

- Email notifications
- Book return reminders
- Fine management
- Analytics dashboard
- Book reservation system
- QR Code based borrowing
- Barcode scanning
- Pagination and filters
- Export reports

---

## 📷 Screenshots

### Home Page

_Add screenshot here_

### Book Details

_Add screenshot here_

### Admin Dashboard

_Add screenshot here_

### User Management

_Add screenshot here_

### Book Management

_Add screenshot here_

### Account Approval

_Add screenshot here_

---

## 👩‍💻 Author

**Yasaswi Kopparapu**

GitHub: https://github.com/yasaswi-2204

LinkedIn: https://www.linkedin.com/in/yasaswi-kopparapu/

---

## ✨ Key Highlights

- Full-stack web application built with Next.js and TypeScript
- Secure authentication using NextAuth.js
- PostgreSQL database with Drizzle ORM
- University ID verification workflow for user approval
- Image uploads and management using ImageKit
- Responsive admin dashboard with user and book management
- Clean and modern UI built with Tailwind CSS and shadcn/ui
