from fastapi import APIRouter, HTTPException, status
from config.database import db_client
from models.book import Book, Partial_Book
from schemas.book import book_schema, books_schema
import mysql.connector

router = APIRouter(prefix="/book",
                  tags=["book"],
                  responses={status.HTTP_404_NOT_FOUND: {"message": "No encontrado"}})


@router.get("/all", response_model=list[Book])
async def books():
  cursor=db_client.cursor()
  query = "SELECT * FROM BOOK;"
  cursor.execute(query)
  results = cursor.fetchall()
  return books_schema(results)

@router.get("/{id}")
async def book(id: int):
  return search_by_field("id_book", id)

@router.get("/")
async def book(id: int):
  return search_by_field("id_book", id)

@router.post("/", response_model=Book, status_code=status.HTTP_201_CREATED)
async def create_book(book: Partial_Book):
  print(book)
  cursor = db_client.cursor()
    
  existing_book = search_by_field("title", book.title)
  if isinstance(existing_book, Book):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="El libro ya existe")
    
  query = """
  INSERT INTO BOOK (title, author, price, stock, publisher)
  VALUES (%s, %s, %s, %s, %s)
  """

  cursor.execute(
    query,
    (book.title, 
    book.author, 
    book.price, 
    book.stock, 
    book.publisher)
  )
    
  db_client.commit()

  query = "SELECT * FROM BOOK WHERE title = %s"
  cursor.execute(query, (book.title,))
  result = cursor.fetchone()
    
  return Book(**book_schema(result))

@router.put("/", response_model=Book)
async def update_book(book: Book):
  cursor = db_client.cursor()

  try:
    query = """
    UPDATE BOOK
    SET title = %s, author = %s, price = %s, stock = %s, publisher = %s 
    WHERE id_book = %s
    """
    cursor.execute(query, (book.title, book.author, book.price, book.stock, book.publisher, book.id_book))
    db_client.commit()
  except:
    return {"error": "No se ha actualizado el libro"}

  query = "SELECT * FROM BOOK WHERE id_book = %s"
  cursor.execute(query, (book.id_book,))
  book_data = cursor.fetchone()

  return Book(**book_schema(book_data))

@router.delete("/{id_book}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(id_book: int):
  cursor = db_client.cursor()
  
  try:
    query = "DELETE FROM BOOK WHERE id_book = %s"
    cursor.execute(query, (id_book,))
    db_client.commit()
  except:
    return {"error": "No se ha eliminado el libro"}
    
  return {"message": "Libro eliminado"}

def search_by_field(field: str, key):
  cursor=db_client.cursor()
  query = f"SELECT * FROM BOOK WHERE {field} = %s"
  cursor.execute(query, (key,))
  try:
    book = cursor.fetchone()
    return Book(**book_schema(book))
  except:
    return {"error": "No se ha encontrado el libro"}