import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { Review } from '../schemas/review'

export const createReview = async (review: Review) => {
  try {
    await setDoc(doc(db, 'reviews', review.userId), {
      ...review
    })
    return true

  } catch (err) {
    return null
  }
}
