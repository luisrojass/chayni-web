// Dependencies
import { Link } from 'react-router-dom'

// Hooks
import { useTheme } from '../hooks/useTheme'
import { useProducts } from '../hooks/useProducts'

// Schemas
import { Product } from '../schemas/Product'

function ProductCard({ product }: { product: Product }) {
  const { theme } = useTheme()
  const { sort } = useProducts()
  const { title, image, price, id } = product

  return (
    <div className='col'>
      <Link to={`/${id}`} className='text-decoration-none'
        onClick={() => {
          sort()
          window.scroll({ top: 0, behavior: 'smooth' })
        }}
      >
        <div className='card shadow hover-card h-100 border-0 p-0 overflow-hidden'>
          <div className='card-image' style={{ backgroundImage: `url('${image}')` }} />
          <div className={`card-body z-1 bg-${theme}`}>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text text-danger fw-bold'>S/{price?.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
