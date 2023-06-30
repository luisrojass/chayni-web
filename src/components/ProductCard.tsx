import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

export interface Product {
  title: string
  image: string
  price: number
  id: string
  description?: string
}

function ProductCard(
  { title, image, price, id }: Product
) {
  const { theme } = useTheme()

  return (
    <div className="col">
      <Link to={`/${id}`} className='text-decoration-none'
        onClick={() => window.scroll({
          top: 0,
          behavior: 'smooth'
        })}
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
