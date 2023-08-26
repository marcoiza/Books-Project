from fastapi import APIRouter, HTTPException, status
from config.database import db_client
from models.transaction import Transaction, Partial_Transaction
from schemas.transaction import transaction_schema, transactions_schema
# from bson import ObjectId
import mysql.connector

router = APIRouter(prefix="/transaction",
                  tags=["transaction"],
                  responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})


@router.get("/all", response_model=list[Transaction])
async def transactions():
    cursor = db_client.cursor()
    query = "SELECT * FROM TRANSACTION;"
    cursor.execute(query)
    results = cursor.fetchall()
    return transactions_schema(results)


@router.get("/{id}")
async def get_transaction(id: int):
    return search_by_field("id_transaction", id)


@router.post("/", response_model=Transaction, status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: Partial_Transaction):
    cursor = db_client.cursor()

    query = """
    INSERT INTO TRANSACTION (id_type_transaction, id_book, quantity, date_transaction)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            transaction.id_type_transaction,
            transaction.id_book,
            transaction.quantity,
            transaction.date_transaction,
        ),
    )

    db_client.commit()

    # query = "SELECT * FROM TRANSACTION WHERE id_book = %s AND date_transaction = %s"
    # cursor.execute(query, (transaction.id_book, transaction.date_transaction,))
    # result = cursor.fetchone()

    # Obtener el ID de la transacción recién insertada
    new_transaction_id = cursor.lastrowid

    query = "SELECT * FROM TRANSACTION WHERE id_transaction = %s"
    cursor.execute(query, (new_transaction_id,))
    result = cursor.fetchone()

    cursor.close()

    value_transaction = return_parameter_by_field(
        "TRANSACTION_TYPE", "value_transaction", "id_type_transaction", transaction.id_type_transaction
    )
    print(value_transaction)
    old_stock = return_parameter_by_field(
        "BOOK", "stock", "id_book", transaction.id_book
    )
    print(old_stock)
    
    update_stock(transaction.id_book, transaction.quantity, value_transaction, old_stock)

    return Transaction(**transaction_schema(result))


@router.delete("/{id_transaction}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_transaction(id_transaction: int):
    cursor = db_client.cursor()

    try:
        query = "DELETE FROM TRANSACTION WHERE id_transaction = %s"
        cursor.execute(query, (id_transaction,))
        db_client.commit()
    except:
        return {"error": "No se ha eliminado el movimiento"}

    return {"message": "Movimiento eliminado"}


def search_by_field(field: str, key):
    cursor = db_client.cursor()
    query = f"SELECT * FROM TRANSACTION WHERE {field} = %s"
    cursor.execute(query, (key,))
    transaction = cursor.fetchone()

    if transaction:
        return Transaction(**transaction_schema(transaction))
    else:
        return None


def return_parameter_by_field(table: str, parameter: str, field: str, key):
    cursor = db_client.cursor()
    query = f"SELECT {parameter} FROM {table} WHERE {field} = %s"
    cursor.execute(query, (key,))
    parameter_value = cursor.fetchone()

    if parameter_value:
      return parameter_value[0]
    else:
      return None


def update_stock(id_book:int, quantity:int, value_transaction:str, old_stock: int):
  if value_transaction == "+":
    new_stock = old_stock + quantity
  elif value_transaction == "-":
    new_stock = old_stock - quantity
  else:
    new_stock = old_stock
  
  cursor = db_client.cursor()
  query = "UPDATE BOOK SET stock = %s WHERE id_book = %s"
  cursor.execute(query, (new_stock, id_book))
  db_client.commit()
  return None