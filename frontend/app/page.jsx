import BookTable from "@components/BookTable";
import StockTable from "@components/StockTable";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Books
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'>Business A</span>
    </h1>
    <BookTable/>
    <StockTable/>
  </section>
);

export default Home;