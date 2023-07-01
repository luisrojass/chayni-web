// Dependencies
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../connections/firebase'

// Components
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

// Hooks
import { useSession } from '../hooks/useSession'

function Account() {
  const { setUser, user, logging } = useSession()
  const navigate = useNavigate()

  const login = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      setUser(credentials.user)

    } catch (err) {
      console.log(err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      navigate('/')
      setUser(null)
    } catch (err) {
      console.log(err)
    }
  }

  if (logging) {
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
      <div className='d-flex align-items-center' style={{ height: '100vh' }}>
        <div className='container'>
          <i className='bi bi-person-slash d-block text-center' style={{ fontSize: '6rem' }}></i>
          <h3 className='text-center px-3 mb-4'>
            ¡Inicia sesión para ver tus pedidos, dejar comentarios y más!
          </h3>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary' onClick={login}>
              <i className='bi bi-google me-2'></i>
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-5'>
      <div className='container pt-4'>
        <div className='row justify-content-center py-5 px-4'>
          <div className='col col-12 col-lg-6'>
            <div className='rounded-circle user-image m-auto'
              style={{
                backgroundImage: `url('${user?.photoURL?.slice(
                  0, user?.photoURL?.length - 4).concat('360-c')}')`
              }} />
          </div>

          <div className='col col-12 col-lg-6 pt-4'>
            <h2 className='text-center text-lg-start'>{user?.displayName}</h2>
            <p className='text-center text-lg-start'>{user?.email}</p>

            <div className='d-flex justify-content-center justify-content-lg-start'>
              <button className='btn btn-danger' onClick={logout}>
                Cerrar sesión
                <i className='bi bi-box-arrow-right ms-2'></i>
              </button>
            </div>
          </div>

          <div className='col col-12 my-4 d-flex justify-content-center'>
            <div className='position-absolute d-flex justify-content-center'>
              <Link className='nav-link navbar-link text-decoration-none me-4' to='/reviews'>
                Reseñas
              </Link>

              <Link className='nav-link navbar-link text-decoration-none' to='/orders'>
                Mis pedidos
              </Link>
            </div>
          </div>
        </div>

        <h5 className='px-4'>Te puede interesar</h5>
        <ProductList quantity={12} />
      </div>
      <Footer />
    </div>
  )
}

export default Account
