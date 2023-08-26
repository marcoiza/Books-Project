from pydantic import BaseModel
from typing import Optional

class Book(BaseModel):
  id_book: int
  title: str
  author: str
  price: float
  stock: int
  publisher: str

class Partial_Book(BaseModel):
  title: str
  author: str
  price: float
  stock: int
  publisher: str