"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BookForm from "@components/BookForm";

const CreateBook = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({ title: "", author: "", price: "", stock: "", publisher: "" });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const createBook = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          price: book.price,
          stock: book.stock,
          publisher: book.publisher,
        }),
      });

      console.log("Response status:", response.status);

      if (response.status === 201) {
        router.push("/"); // Redirigir a la página principal
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookForm
      type='Crear'
      book={book}
      setBook={setBook}
      submitting={submitting}
      handleSubmit={createBook}
    />
  );
};

export default CreateBook;