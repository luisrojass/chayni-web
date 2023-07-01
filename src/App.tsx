// Dependencies
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from './connections/firebase'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Account from './pages/Account'
import Orders from './pages/Orders'

// Hooks
import { useTheme } from './hooks/useTheme'
import { useSession } from './hooks/useSession'
import { useProducts } from './hooks/useProducts'

function App() {
  const { theme } = useTheme()
  const { setUser, setLogging } = useSession()
  const { products, sort } = useProducts()

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme)
  }, [theme])

  useEffect(() => {
    sort()
    onAuthStateChanged(auth, (user) => setUser(user))
    setTimeout(() => {
      setLogging(false)
    }, 1000);
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='pt-5 pb-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/orders' element={<Orders />} />
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
