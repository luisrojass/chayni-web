// Dependencies
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Data
import products from '../data/products.json'

// Components
import ProductList from '../components/ProductList'
import { Product } from '../components/ProductCard'

function ProductPage() {
  const { pathname } = useLocation()
  const [product, setProduct] = useState(null as unknown as Product)
  const [quantity, setQuantity] = useState(innerWidth > 992 && innerWidth < 1200 ? 3 : 4)

  const resize = () => {
    setQuantity(innerWidth > 992 && innerWidth < 1200 ? 3 : 4)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    setProduct(products.filter(p => pathname.includes(p.id))[0])
  }, [pathname])

  return (
    <div className='container px-4 pt-5'>
      <div className='row justify-content-evenly px-2 mb-4'>
        <div className='col col-12 col-lg-5 col-xl-4 rounded-3 overflow-hidden'>
          <div className='w-100 rounded-3 product-image hover-zoom'
            style={{ backgroundImage: `url('${product?.image}')` }} />
        </div>
        <div className='col col-12 col-lg-6 py-4'>
          <h2>{product?.title}</h2>
          <h5 className='text-danger mb-4'>
            S/{product?.price?.toFixed(2)}
            <button className='btn btn-danger mx-3'>Solicitar</button>
          </h5>
          <p>{product?.description}</p>
        </div>
      </div>

      <h5 className='px-2 px-lg-4'>Productos relacionados</h5>
      <ProductList sort quantity={quantity} />
    </div>
  )
}

export default ProductPage
