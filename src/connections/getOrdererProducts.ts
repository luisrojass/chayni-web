import { collection, query, where, getDocs } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db } from './firebase'
import { Order } from '../schemas/order'

export const getOrderedProducts = async (user: User) => {
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid))
    const querySnapshot = await getDocs(q)
    const res: Order[] = []
    querySnapshot.forEach(doc => res.push({
      ...doc.data() as Order,
      id: doc.ref.id
    }))
    return res as Order[]

  } catch (err) {
    return false
  }
}
