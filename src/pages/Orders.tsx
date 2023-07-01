// Dependencies
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../connections/firebase'

// Components
import ProductOrder from '../components/ProductOrder'

// Hooks
import { useSession } from '../hooks/useSession'
import { useProducts } from '../hooks/useProducts'

// Functions
import { getOrderedProducts } from '../connections/getOrdererProducts'

// Schemas
import { OrderCard } from '../schemas/order'

function Orders() {
  const { setUser, user, logging } = useSession()
  const { getProduct } = useProducts()

  const [orders, setOrders] = useState<OrderCard[]>([])
  const [loading, setLoading] = useState(true)

  const login = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      setUser(credentials.user)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    (async () => {
      const success = await getOrderedProducts(user as User)
      if (success) {
        const foundProducts: OrderCard[] = []
        success.forEach(({ product, delivered, id }) => {
          foundProducts.push({
            title: getProduct(product).title,
            image: getProduct(product).image,
            price: getProduct(product).price,
            delivered,
            id
          })
        })
        setOrders(foundProducts)
      }
      setTimeout(() => setLoading(false), 2000)
    })()
  }, [user])

  if (logging || loading) {
    return (
      <div className='container'>
        <div
          className='spinner-border text-secondary position-absolute top-50'
          role='status' style={{ height: '3rem', width: '3rem', left: 'calc(50% - 1.5rem)' }}>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='container pt-5'>
        <i className='bi bi-person-fill-slash d-block text-center' style={{ fontSize: '12rem' }}></i>
        <div className='d-block'>
          <h2 className='text-center px-3 mb-4'>
            ¡Inicia sesión para ver tus pedidos, dejar comentarios y más!
          </h2>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-success' onClick={login}>
              <i className='bi bi-google me-2'></i>
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className='container pt-5'>
        <i className='bi bi-bag-check d-block text-center' style={{ fontSize: '12rem' }}></i>
        <div className='d-block'>
          <h2 className='text-center px-3 mb-4'>
            Aún no tienes pedidos. !Pide uno ya!
          </h2>
          <div className='d-flex justify-content-center'>
            <Link to='/'>
              <button className='btn btn-primary'>Ir a la tienda</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container pt-5 px-5'>
      <h1 className='text-center text-lg-start ms-0 ms-lg-2 ms-xl-5 mb-4'>Mis pedidos</h1>
      <div className='row row-cols-1 row-cols-md-2 g-4 mb-4'>
        {
          orders.map(product => (
            <ProductOrder key={Math.random()} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default Orders
