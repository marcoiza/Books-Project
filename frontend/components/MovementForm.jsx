import Link from "next/link";
import { useState, useEffect } from "react";

const MovementForm = ({ type, transaction, setTransaction, submitting, handleSubmit }) => {
  const [books, setBooks] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/transactions-type/all`);
        if (response.status === 200) {
          const transactionTypesData = await response.json();
          setTransactionTypes(transactionTypesData);
        }

        const booksResponse = await fetch(`${apiUrl}/book/all`);
        if (booksResponse.status === 200) {
          const booksData = await booksResponse.json();
          setBooks(booksData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleBookChange = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);

    const updatedTransaction = {
      ...transaction,
      id_book: updatedBooks[index].id_book,
      quantity: updatedBooks[index].quantity,
    };
    setTransaction(updatedTransaction);
  };

  const transactionTypeOptions = transactionTypes.map((transactionType) => (
    <option key={transactionType.id_type_transaction} value={transactionType.id_type_transaction}>
      {transactionType.name_transaction}
    </option>
  ));

  const bookOptions = books.map((book) => (
    <option key={book.id_book} value={book.id_book}>{book.title}</option>
  ));
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Movimiento</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <div className='flex flex-col gap-4'>
        <label className='font-satoshi font-semibold text-base text-gray-700'>
            Tipo de transacción
            <select
              value={transaction.id_type_transaction}
              onChange={(e) => setTransaction({ ...transaction, id_type_transaction: e.target.value })}
              required
              className='form_input'
            >
              <option value='' disabled>Seleccione un tipo de transacción</option>
              {transactionTypeOptions}

            </select>
          </label>

          <label className='font-satoshi font-semibold text-base text-gray-700'>
            Fecha
            <input
              value={transaction.date_transaction}
              onChange={(e) => setTransaction({ ...transaction, date_transaction: e.target.value })}
              placeholder='AAAA-MM-DD'
              required
              className='form_input'
            />
          </label>
        </div>

        <div className='mt-8'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='py-2 px-4'>Libro</th>
                <th className='py-2 px-4'>Cantidad</th>
                <th className='py-2 px-4'></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-2 px-4'>
                  <select
                    value={transaction.id_book}
                    onChange={(e) => setTransaction({ ...transaction, id_book: e.target.value })}
                    required
                    className='form_input'
                  >
                    <option value='' disabled>Seleccione un libro</option>
                    {bookOptions}


                  </select>
                </td>
                <td className='py-2 px-4'>
                  <input
                    value={transaction.quantity}
                    onChange={(e) => setTransaction({ ...transaction, quantity: e.target.value })}
                    type='text'
                    className='form_input'
                    placeholder='Cantidad'
                  />
                </td>
              </tr>
            </tbody>
          </table>

          
        </div>

        {/* <button
            type='button'
            onClick={addBookRow}
            className='text-blue-600 hover:underline mt-2'
          >
            Agregar Libro
          </button> */}

        <div className='flex-end mx-3 mt-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancelar
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default MovementForm