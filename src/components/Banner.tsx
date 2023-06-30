function Banner() {
  return (
    <div
      id='banner'
      className='carousel slide'
      data-bs-ride='carousel'
    >
      <div className='carousel-inner'>
        <div className='carousel-item active' data-bs-interval='3000'>
          <div className='d-block banner' />
          <span
            className='h1 text-white text-center position-absolute top-50 mx-5 px-5'
            style={{ textShadow: '#000 0 0 16px', bottom: '2rem' }}
          >
            Conoce los primeros chalecos biodegradables
          </span>
        </div>
        <div className='carousel-item' data-bs-interval='3000'>
          <div className='d-block banner' />
          <span
            className='h1 text-white text-center position-absolute top-50 mx-5 px-5'
            style={{ textShadow: '#000 0 0 16px', bottom: '2rem' }}
          >
            Vive sostenible a tu estilo
          </span>
        </div>
      </div>
      <button className='carousel-control-prev' type='button'
        data-bs-target='#banner' data-bs-slide='prev'>
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button className='carousel-control-next' type='button'
        data-bs-target='#banner' data-bs-slide='next'>
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  )
}

export default Banner
