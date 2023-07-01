import { doc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

export const cancelOrder = async (orderId: string) => {
  try {
    await deleteDoc(doc(db, 'orders', orderId))
    return true

  } catch (err) {
    return false
  }
}
