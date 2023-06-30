// Dependencies
import { useState } from 'react'

// Components
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'

function Home() {
  const [quantity, setQuantity] = useState(12)

  return (
    <div>
      <Banner />
      <ProductList quantity={quantity} />
      {
        quantity < 24 &&
        <div className='d-flex justify-content-center pt-2 pb-4'>
          <button className='btn btn-primary' onClick={() => setQuantity(24)}>
            Cargar más
          </button>
        </div>
      }
    </div>
  )
}

export default Home
