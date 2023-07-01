export interface Order {
  product: string
  userId: string
  email: string
  delivered: boolean
  id: string
}

export interface OrderCard {
  title: string
  image: string
  price: number
  id: string
  delivered: boolean
}
