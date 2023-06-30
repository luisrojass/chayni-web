// Dependencies
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../connections/firebase'

// Hooks
import { useTheme } from '../hooks/useTheme'
import { useSession } from '../hooks/useSession'

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, setUser } = useSession()

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
      setUser(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='position-fixed top-0 w-100 z-3'>
      <nav className={`navbar navbar-expand-xxl shadow px-3 bg-${theme}`}>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <Link className='navbar-brand' to='/'
            onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>
            {innerWidth >= 992 && <img src='/icon32.png' className='pb-1' />}
            <span className='navbar-brand mx-0 ms-lg-2'>Chayni</span>
          </Link>

          <div>
            <button className='btn border-0 hover-icon'>
              <i className={`h3 text-secondary bi bi-${theme === 'dark' ? 'sun' : 'moon-fill'}`}
                onClick={toggleTheme}></i>
            </button>
            {
              user?.email
                ? (
                  <>
                    <div className='d-inline-flex pe-3' style={{ maxWidth: '18vw', height: '1.6rem', overflow: 'hidden' }}>
                      <span className='text-secondary text-center'>{user?.displayName}</span>
                    </div>
                    <button className='btn btn-danger' onClick={logout}>Cerrar sesión</button>
                  </>
                )
                : (
                  <button className='btn btn-success my-0' onClick={login}>
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
