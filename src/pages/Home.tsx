// Dependencies
import { useState } from 'react'

// Components
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

function Home() {
  const [quantity, setQuantity] = useState(12)

  return (
    <>
      <Banner />
      <ProductList quantity={quantity} />
      {
        quantity < 24 &&
        <div className='d-flex justify-content-center pb-4'>
          <button className='btn btn-primary' onClick={() => setQuantity(24)}>
            Cargar más
          </button>
        </div>
      }
      <Footer />
    </>
  )
}

export default Home
