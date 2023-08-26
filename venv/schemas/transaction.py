def transaction_schema(transaction) -> dict:
  return {"id_transaction": transaction[0],
          "id_type_transaction": transaction[1],
          "id_book": transaction[2],
          "quantity": transaction[3],
          "date_transaction": transaction[4]}

def transactions_schema(transactions) -> list:
  return [transaction_schema(transaction) for transaction in transactions]