"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSession } from "next-auth/react";

const BookTable = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${apiUrl}/book/all`);
        if (response.status === 200) {
          const booksData = await response.json();
          setBooks(booksData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchBooks();
  }, []);

  const handleDelete = async (id_book) => {
    try {
      const response = await fetch(`${apiUrl}/book/${id_book}`, {
        method: "DELETE"
      });
      if (response.status === 204) {
        // Eliminación exitosa, actualiza la lista de libros
        setBooks(books.filter(book => book.id_book !== id_book));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!session?.user) {
    return null; // No hay usuario autenticado, no renderiza el componente
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Libros</h2>
      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Autor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Publisher
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book.id}>
              <td className="px-6 py-4 whitespace-nowrap">{book.id_book}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">${book.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.publisher}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/update-book/${book.id_book}`}
                  className="text-blue-600 hover:underline mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                  {/* <button
                    onClick={() => handleEdit(book.id_book)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button> */}
                <button
                  onClick={() => handleDelete(book.id_book)}
                  className="text-red-600 hover:underline"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
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
