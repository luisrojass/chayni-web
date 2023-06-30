// Data
import products from '../data/products.json'

// Components
import ProductCard from '../components/ProductCard'

interface ProductList {
  sort?: boolean
  quantity?: number
}

function ProductList({ sort, quantity }: ProductList) {
  if (sort) {
    products.sort(() => Math.random() - 0.5)
  }

  const list = products.slice(0, quantity ?? 24)

  return (
    <div className='container px-4 py-3'>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4'>
        {
          list.map(({ title, image, price, id }) => (
            <ProductCard key={id} title={title} image={image} price={price} id={id} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductList
