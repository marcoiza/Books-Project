import Link from "next/link";

const BookForm = ({ type, book, setBook, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Libro</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Titulo
          </span>

          <input
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            placeholder='ej. Quijote de la Mancha'
            required
            className='form_input '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Autor
          </span>
          <input
            value={book.autor}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            type='text'
            placeholder='ej. Miguel de Cervantes'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Precio
          </span>
          <input
            value={book.price}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
            type='text'
            placeholder='ej. 9.99'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Stock
          </span>
          <input
            value={book.stock}
            onChange={(e) => setBook({ ...book, stock: e.target.value })}
            type='text'
            placeholder='ej. 50'
            required
            className='form_input'
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Editorial
          </span>
          <input
            value={book.publisher}
            onChange={(e) => setBook({ ...book, publisher: e.target.value })}
            type='text'
            placeholder='ej. Pearsman'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookForm;