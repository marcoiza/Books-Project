def transaction_type_schema(transaction_type) -> dict:
  return {"id_type_transaction": transaction_type[0],
          "name_transaction": transaction_type[1],
          "value_transaction": transaction_type[2]}

def transactions_type_schema(transactions_type) -> list:
  return [transaction_type_schema(transaction_type) for transaction_type in transactions_type]