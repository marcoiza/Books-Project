"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const StockTable = () => {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [typeTransactionNames, setTypeTransactionNames] = useState({});
  const [typeBooksTitle, setBooksTitle] = useState({});
  const [loading, setLoading] = useState(true); // Agrega un estado para el indicador de carga
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`${apiUrl}/transaction/all`);
        if (response.status === 200) {
          const transactionsData = await response.json();
          setTransactions(transactionsData);
          await Promise.all([
            fetchTypeTransactionNames(transactionsData),
            fetchBooksTitle(transactionsData)
          ]);
          setLoading(false); // Indicar que la carga ha finalizado
        }
      } catch (error) {
        console.log(error);
        setLoading(false); // Manejar errores y finalizar la carga
      }
    }

    fetchTransactions();
  }, []);

  const fetchTypeTransactionNames = async (transactionsData) => {
    const names = {};
    await Promise.all(
      transactionsData.map(async (transaction) => {
        try {
          const response = await fetch(`${apiUrl}/transactions-type/${transaction.id_type_transaction}`);
          if (response.status === 200) {
            const data = await response.json();
            names[transaction.id_type_transaction] = data.name_transaction;
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    setTypeTransactionNames(names);
  };

  const fetchBooksTitle = async (transactionsData) => {
    const titles = {};
    await Promise.all(
      transactionsData.map(async (transaction) => {
        try {
          const response = await fetch(`${apiUrl}/book/${transaction.id_book}`);
          if (response.status === 200) {
            const data = await response.json();
            titles[transaction.id_book] = data.title;
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    setBooksTitle(titles);
  };

  if (!session?.user) {
    return null; // No hay usuario autenticado, no renderiza el componente
  }
  
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Movimientos</h2>
      {loading ? (
        <p>Cargando...</p> // Agregar un indicador de carga
      ) : (
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaccion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Libro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id_transaction}>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.id_transaction}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {typeTransactionNames[transaction.id_type_transaction] || 'Cargando...'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {typeBooksTitle[transaction.id_book] || 'Cargando...'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.date_transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  )
}

export default StockTable