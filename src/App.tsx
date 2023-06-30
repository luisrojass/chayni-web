// Dependencies
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from './connections/firebase'

// Data
import products from './data/products.json'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'

// Hooks
import { useTheme } from './hooks/useTheme'
import { useSession } from './hooks/useSession'

function App() {
  const { theme } = useTheme()
  const { setUser } = useSession()

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme)
  }, [theme])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user))
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='pt-5 pb-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          {
            products.map(({ id }) => (
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
