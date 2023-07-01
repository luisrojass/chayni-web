// Schemas
import { Review } from '../schemas/review'

function ReviewCard({ review }: { review: Review }) {
  const { username, imageUrl, content } = review

  return (
    <div className='col px-3'>
      <div className='card shadow border-0 overflow-hidden'>
        <div className='card-review-image' style={{ backgroundImage: `url('${imageUrl}')` }} />
        <div className={`card-body z-1`}>
          <div className='card-title'>
            <span className='fs-6 fw-bold'>{username} </span>
            <span className='fs-6'>dice:</span>
            <p className='card-text'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
