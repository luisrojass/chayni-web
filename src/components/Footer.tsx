import { Link } from "react-router-dom"

function Footer() {
  const goTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='w-100 mt-3 py-2 px-4' style={{ boxShadow: '1rem 1rem 2rem #000' }}>
      <footer className='mt-3 mb-4'>
        <div className='nav justify-content-center justify-content-md-between border-bottom pb-3 mb-3'>
          <div className='d-flex justify-content-center'>
            <Link className='nav-link text-muted px-2' to='/reviews' onClick={goTop}>
              Reseñas
            </Link>
            <Link className='nav-link text-muted px-2' to='/orders' onClick={goTop}>
              Mis pedidos
            </Link>
            <Link className='nav-link text-muted px-2' to='/account' onClick={goTop}>
              Mi cuenta
            </Link>
          </div>
          <div className='d-flex justify-content-center'>
            <a className='nav-link text-muted' href='https://web.facebook.com/profile.php?id=100094201842502' target='_blank'>
              <i className='h4 bi bi-facebook'></i>
            </a>
            <a className='nav-link text-muted' href='https://www.instagram.com/chayni.pe/' target='_blank'>
              <i className='h4 bi bi-instagram'></i>
            </a>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <a className='nav-link text-center text-muted' href='https://github.com/luisrojass?tab=repositories' target='_blank'>
            <i className='h5 bi bi-github me-2'></i>
            Contáctame
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
