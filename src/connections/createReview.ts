import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { Review } from '../schemas/review'

export const createReview = async (review: Review) => {
  try {
    await setDoc(doc(db, 'reviews', review.userId), {
      ...review,
      imageUrl: review.imageUrl.slice(
        0, review.imageUrl.length - 4
      ).concat('360-c')
    })
    return true

  } catch (err) {
    return null
  }
}
