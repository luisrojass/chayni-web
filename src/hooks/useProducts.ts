import { create } from 'zustand'
import { Product } from '../schemas/Product'
import products from '../data/products.json'

interface Products {
  products: Product[]
  getProduct(id: string): Product
  sort: () => void
}

export const useProducts = create<Products>(
  (set, get) => ({
    products: products,

    getProduct: (id) => {
      const [foundProduct] = get().products.filter(product => product.id === id)
      return foundProduct ?? {}
    },

    sort: () => {
      set(state => ({
        products: state.products.sort(() => Math.random() - 0.5)
      }))
    }
  })
)
