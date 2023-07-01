// Dependencies
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../connections/firebase'

// Hooks
import { useTheme } from '../hooks/useTheme'
import { useSession } from '../hooks/useSession'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, setUser, logging } = useSession()

  const login = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      setUser(credentials.user)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='position-fixed top-0 w-100 z-3'>
      <nav className={`navbar navbar-expand-xxl shadow px-3 bg-${theme}`}>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <div>
            <Link className='navbar-brand' to='/'
              onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>
              <img src='/icon32.png' className='pb-1 hover-icon' />
              <span className='navbar-brand ms-2'>Chayni</span>
            </Link>

            <Link className='nav-link navbar-link text-decoration-none d-none d-sm-inline-block me-4' to='/reviews'>
              Reseñas
            </Link>

            <Link className='nav-link navbar-link text-decoration-none d-none d-sm-inline-block' to='/orders'>
              Mis pedidos
            </Link>
          </div>

          <div>
            <button className='btn border-0 hover-icon'>
              <i className={`h3 text-secondary bi bi-${theme === 'dark' ? 'sun' : 'moon-fill'}`}
                onClick={toggleTheme}></i>
            </button>
            {
              logging
                ? (
                  <button className='btn btn-secondary' type='button' disabled>
                    <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                    Cargando...
                  </button>
                )
                : user?.email
                  ? (
                    <Link to='/account'>
                      <button className='btn btn-primary'>
                        <i className='bi bi-person-fill me-2'></i>
                        Mi cuenta
                      </button>
                    </Link>
                  )
                  : (
                    <button className='btn btn-primary my-0' onClick={login}>
                      <i className='bi bi-google me-2'></i>
                      Iniciar sesión
                    </button>
                  )
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
