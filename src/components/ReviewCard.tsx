// Schemas
import { Review } from '../schemas/review'

function ReviewCard({ review }: { review: Review }) {
  const { username, imageUrl, content } = review

  return (
    <div className='col px-3'>
      <div className='card shadow overflow-hidden'>
        <div className='card-body'>
          <div className='card-title'>
            <span className='fs-6 fw-bold d-flex align-items-center mb-3'>
              <div className='card-review-image d-inline-block me-3'
                style={{ backgroundImage: `url('${imageUrl}')` }} />
              {username}
            </span>
            <p className='card-text'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
