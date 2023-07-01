// Dependencies
import { useEffect, useState } from 'react'

// Components
import ReviewCard from '../components/ReviewCard'

// Hooks
import { useSession } from '../hooks/useSession'
import { useTheme } from '../hooks/useTheme'

// Functions
import { createReview } from '../connections/createReview'
import { getReviews } from '../connections/getReviews'

// Schemas
import { Review } from '../schemas/review'

function Reviews() {
  const { user, logging } = useSession()
  const { theme } = useTheme()

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    getReviews().then(res => {
      setReviews(res ?? [])
      setLoading(false)
    })
  }, [])

  const postReview = async () => {
    if (content !== '') {
      setLoading(true)
      await createReview({
        username: user?.displayName as string,
        userId: user?.uid as string,
        imageUrl: user?.photoURL as string,
        content
      })
      setContent('')
      getReviews().then(res => setReviews(res ?? []))
      setLoading(false)
    }
  }

  if (logging || loading) {
    return (
      <div className='container'>
        <div
          className='spinner-border text-secondary position-absolute top-50'
          role='status' style={{ height: '3rem', width: '3rem', left: 'calc(50% - 1.5rem)' }}>
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className='d-flex align-items-center' style={{ height: '100vh' }}>
        <div className='container'>
          <i className='bi bi-chat-left-dots d-block text-center' style={{ fontSize: '6rem' }}></i>
          <h3 className='text-center px-3 mb-4'>
            Aún no hay comentarios, ¡sé el primero en dejar uno!
          </h3>
        </div>

        {
          user
            ? (
              <div className={`position-fixed w-100 bottom-0 p-3 px-lg-5 bg-${theme} z-1`}
                style={{ boxShadow: '1rem 1rem 2rem #000' }}>
                <div className='input-group'>
                  <textarea className='form-control' placeholder='Los chalecos me parecieron...'
                    rows={1} onChange={e => setContent(e.target.value)} value={content}></textarea>
                  <button className='btn btn-primary' onClick={postReview} disabled={loading}>
                    {loading && <span className='spinner-border spinner-border-sm me-2' />}
                    Publicar
                  </button>
                </div>
              </div>
            )
            : (
              <div className={`position-fixed w-100 bottom-0 pt-3 pb-2 px-4 bg-${theme} z-1`}
                style={{ boxShadow: '1rem 1rem 2rem #000' }}>
                <h5 className='text-center'>
                  ¡Inicia sesión para dejar un comentario!
                </h5>
              </div>
            )
        }
      </div >
    )
  }

  return (
    <div className='pt-5'>
      <div className='container pt-3 pt-lg-4 pb-5'>
        <h2 className='text-center text-md-start px-3 px-md-4 my-4'>
          Lo que dicen nuestros clientes
        </h2>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 px-4 pb-5 g-3'>
          {
            reviews.map(review => (
              <ReviewCard key={Math.random()} review={review} />
            ))
          }
        </div>
      </div>

      {
        user
          ? (
            <div className={`position-fixed w-100 bottom-0 p-3 px-lg-5 bg-${theme} z-1`}
              style={{ boxShadow: '1rem 1rem 2rem #000' }}>
              <div className='input-group'>
                <textarea className='form-control' placeholder='Los chalecos me parecieron...'
                  rows={1} onChange={e => setContent(e.target.value)} value={content}></textarea>
                <button className='btn btn-primary' onClick={postReview} disabled={loading}>
                  {loading && <span className='spinner-border spinner-border-sm me-2' />}
                  Publicar
                </button>
              </div>
            </div>
          )
          : (
            <div className={`position-fixed w-100 bottom-0 pt-3 pb-2 px-4 bg-${theme} z-1`}
              style={{ boxShadow: '1rem 1rem 2rem #000' }}>
              <h5 className='text-center'>
                ¡Inicia sesión para dejar un comentario!
              </h5>
            </div>
          )
      }
    </div>
  )
}

export default Reviews
