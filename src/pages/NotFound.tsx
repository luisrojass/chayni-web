// Dependencies
import { Link } from 'react-router-dom'

// Components
import Footer from '../components/Footer'

function NotFound() {
  return (
    <div className='pt-5'>
      <div className='container-fluid px-0 position-relative'>
        <div className='d-inline-block banner' />
        <div className='w-100 d-flex justify-content-center align-items-center'>
          <div className='position-absolute top-50 text-center px-5'>
            <span
              className='h1 text-white'
              style={{ textShadow: '#000 0 0 16px', bottom: '2rem' }}>
              Página no encontrada
            </span>
          </div>
        </div>
      </div>

      <div className='d-flex w-100 my-4 justify-content-center'>
        <Link to='/' className='nav-link navbar-link p-2 z-1'>
          Ir a la página principal
          <i className='bi bi-arrow-right ms-2'></i>
        </Link>
      </div>

      <div className='position-fixed bottom-0 w-100'>
        <Footer />
      </div>
    </div>
  )
}

export default NotFound
