// Components
import ProductCard from '../components/ProductCard'

// Hooks
import { useProducts } from '../hooks/useProducts'

interface ProductList {
  quantity?: number
}

function ProductList({ quantity }: ProductList) {
  const { products } = useProducts()

  const list = products.slice(0, quantity ?? 24)

  return (
    <div className='container p-4'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4'>
        {
          list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductList
