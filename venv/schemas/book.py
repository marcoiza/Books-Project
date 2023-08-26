def book_schema(book) -> dict:
  return {"id_book": book[0],
          "title": book[1],
          "author": book[2],
          "price": book[3],
          "stock": book[4],
          "publisher": book[5]}

def books_schema(books) -> list:
  return [book_schema(book) for book in books]