from pydantic import BaseModel
from typing import Optional

class TransactionType(BaseModel):
  id_type_transaction: int
  name_transaction: str
  value_transaction: str

class Partial_TransactionType(BaseModel):
  name_transaction: str
  value_transaction: str