// Components
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'

function Home() {
  return (
    <div>
      <Banner />
      <ProductList quantity={24} sort />
    </div>
  )
}

export default Home
