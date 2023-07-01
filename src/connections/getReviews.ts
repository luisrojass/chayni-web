import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { Review } from '../schemas/review'

export const getReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reviews'))
    const res: Review[] = []
    querySnapshot.forEach(doc => {
      res.push({ ...doc.data() as Review })
    })
    return res as Review[]

  } catch (err) {
    return null
  }
}
