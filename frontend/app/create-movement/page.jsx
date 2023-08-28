"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import MovementForm from "@components/MovementForm";

const CreateMovement = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState({ id_type_transaction: "", id_book: "", quantity: "", date_transaction: ""});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const createTransaction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_type_transaction: transaction.id_type_transaction,
          id_book: transaction.id_book,
          quantity: transaction.quantity,
          date_transaction: transaction.date_transaction,
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
    <MovementForm
      type='Insertar'
      transaction={transaction}
      setTransaction={setTransaction}
      submitting={submitting}
      handleSubmit={createTransaction}
    />
  );
};

export default CreateMovement;