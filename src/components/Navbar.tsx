import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='position-fixed top-0 w-100 z-3'>
      <nav className={`navbar navbar-expand-xxl shadow px-3 bg-${theme}`}>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <Link className='navbar-brand' to='/'>
            <img src='/icon32.png' className='pb-1' />
            <span className='navbar-brand mx-2'>Chayni</span>
          </Link>

          <i className={`h3 text-secondary mt-1 hover-icon bi bi-${theme === 'dark' ? 'sun' : 'moon-fill'}`}
            onClick={toggleTheme}></i>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
