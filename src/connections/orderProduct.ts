import { addDoc, collection } from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db } from './firebase'
import { Product } from '../schemas/product'

export const orderProduct = async (product: Product, user: User) => {
  try {
    await addDoc(collection(db, 'orders'), {
      product: product.id,
      userId: user.uid,
      email: user.email,
      delivered: false
    })
    return true

  } catch (err) {
    return false
  }
}
