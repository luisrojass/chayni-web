// Dependencies
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../connections/firebase'

// Components
import ProductList from '../components/ProductList'

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
      <div className='container pt-5'>
        <i className='bi bi-person-fill-slash d-block text-center' style={{ fontSize: '12rem' }}></i>
        <div className='d-block'>
          <h2 className='text-center px-3 mb-5'>
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

  return (
    <div className='container pt-4'>
      <div className='row justify-content-center py-5 px-4'>
        <div className='col col-12 col-lg-6'>
          <div className='rounded-circle user-image m-auto'
            style={{ backgroundImage: `url('${user?.photoURL}')` }} />
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
      </div>

      <h5 className='px-4'>Te puede interesar</h5>
      <ProductList quantity={12} />
    </div>
  )
}

export default Account
