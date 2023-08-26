from pydantic import BaseModel
from typing import Optional

class Transaction(BaseModel):
  id_transaction: int
  id_type_transaction: int
  id_book: int
  quantity: int
  date_transaction: str

class Partial_Transaction(BaseModel):
  id_type_transaction: int
  id_book: int
  quantity: int
  date_transaction: str