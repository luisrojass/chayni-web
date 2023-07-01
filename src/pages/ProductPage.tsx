// Dependencies
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Components
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

// Hooks
import { useProducts } from '../hooks/useProducts'
import { useSession } from '../hooks/useSession'

// Schemas
import { Product } from '../schemas/product'

// Functions
import { orderProduct } from '../connections/orderProduct'
import { login } from '../connections/login'

function ProductPage() {
  const { pathname } = useLocation()
  const { getProduct } = useProducts()
  const { user, setUser } = useSession()

  const [product, setProduct] = useState<Product>()
  const [quantity, setQuantity] = useState(innerWidth > 992 && innerWidth < 1200 ? 3 : 4)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const resize = () => {
    setQuantity(innerWidth > 992 && innerWidth < 1200 ? 3 : 4)
  }

  const sendOrder = async () => {
    setLoading(true)
    if (!user) {
      setLoading(true)
      setMessage('Iniciando sesión...')
      const success = await login()
      if (success) {
        setUser(success)
        setMessage('¡Ahora puedes pedirlo!')
      }
      else {
        setMessage('No se pudo iniciar sesión')
      }
      setTimeout(() => setMessage(''), 2000)
      setLoading(false)
    }

    else {
      const success = await orderProduct(product as Product, user)
      setMessage(success ? '!Te enviaremos un email pronto!' : 'Ocurrió un error')
      setSuccess(true)
      setTimeout(() => {
        setMessage('')
        setSuccess(false)
      }, 2000)
      setLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    setProduct(getProduct(pathname.slice(1)))
  }, [pathname])

  return (
    <div className='pt-5'>
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
              <button className='btn btn-danger mx-3' disabled={loading} onClick={sendOrder}>
                {
                  loading &&
                  <span className='spinner-border spinner-border-sm me-2' aria-hidden='true' />

                }
                {
                  loading
                    ? 'Pidiendo...'
                    : success ? 'Pedido!' : 'Pídelo ya!'
                }
              </button>
            </h5>
            {message !== '' && <h5 className='text-success'>{message}</h5>}
            <p>{product?.description}</p>
          </div>
        </div>

        <h5 className='px-2 px-lg-4'>Productos relacionados</h5>
        <ProductList quantity={quantity} />
      </div>
      <Footer />
    </div>
  )
}

export default ProductPage
