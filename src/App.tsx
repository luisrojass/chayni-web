// Dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

// Data
import products from './data/products.json'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'

// Hooks
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='pt-5 pb-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          {
            products.map(({id}) => (
              <Route path={`/${id}`} key={id} element={<ProductPage />} />
            ))
          }
          {/* Change to NotFound page */}
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
