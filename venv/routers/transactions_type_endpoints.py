from fastapi import APIRouter, HTTPException, status
from config.database import db_client
from models.transaction_type import TransactionType, Partial_TransactionType
from schemas.transaction_type import transaction_type_schema, transactions_type_schema
# from bson import ObjectId
import mysql.connector

router = APIRouter(prefix="/transactions-type",
                  tags=["transactions-type"],
                  responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})


@router.get("/all", response_model=list[TransactionType])
async def transactions_type():
  cursor=db_client.cursor()
  query = "SELECT * FROM TRANSACTION_TYPE;"
  cursor.execute(query)
  results = cursor.fetchall()
  return transactions_type_schema(results)

@router.get("/{id}")
async def transaction_type(id: int):
  return search_by_field("id_type_transaction", id)

@router.get("/")
async def transaction_type(id: int):
  return search_by_field("id_type_transaction", id)

@router.post("/", response_model=TransactionType, status_code=status.HTTP_201_CREATED)
async def create_transaction_type(transaction_type: Partial_TransactionType):
  print(transaction_type)
  cursor = db_client.cursor()
    
  existing_transaction_type = search_by_field("name_transaction", transaction_type.name_transaction)
  if isinstance(existing_transaction_type, Partial_TransactionType):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="El libro ya existe")
    
  query = """
  INSERT INTO TRANSACTION_TYPE (name_transaction, value_transaction)
  VALUES (%s, %s)
  """

  cursor.execute(
    query,
    (transaction_type.name_transaction, 
    transaction_type.value_transaction)
  )
    
  db_client.commit()

  query = "SELECT * FROM TRANSACTION_TYPE WHERE name_transaction = %s"
  cursor.execute(query, (transaction_type.name_transaction,))
  result = cursor.fetchone()
    
  return TransactionType(**transaction_type_schema(result))

@router.put("/", response_model=TransactionType)
async def update_transaction_type(transaction_type: TransactionType):
  cursor = db_client.cursor()

  try:
    query = """
    UPDATE TRANSACTION_TYPE
    SET name_transaction = %s, value_transaction = %s 
    WHERE id_type_transaction = %s
    """
    cursor.execute(query, (transaction_type.name_transaction, transaction_type.value_transaction, transaction_type.id_type_transaction))
    db_client.commit()
  except:
    return {"error": "No se ha actualizado el tipo de movimiento"}

  query = "SELECT * FROM TRANSACTION_TYPE WHERE id_type_transaction = %s"
  cursor.execute(query, (transaction_type.id_type_transaction,))
  transaction_type_data = cursor.fetchone()

  return TransactionType(**transaction_type_schema(transaction_type_data))

def search_by_field(field: str, key):
  cursor=db_client.cursor()
  query = f"SELECT * FROM TRANSACTION_TYPE WHERE {field} = %s"
  cursor.execute(query, (key,))
  try:
    transaction_type = cursor.fetchone()
    return TransactionType(**transaction_type_schema(transaction_type))
  except:
    return {"error": "No se ha encontrado el tipo de transaccion"}