// Dependencies
import { useState } from 'react'

// Functions
import { cancelOrder } from '../connections/cancelOrder'

// Schemas
import { OrderCard } from '../schemas/order'

function ProductOrder({ product }: { product: OrderCard }) {
  const { title, image, price, delivered, id } = product
  const [loading, setLoading] = useState(false)
  const [canceled, setCanceled] = useState(false)

  const handleCancel = async () => {
    setLoading(true)
    const success = await cancelOrder(id)
    if (success) {
      setCanceled(true)
    }
    setLoading(false)
  }

  if (canceled) {
    return <></>
  }

  return (
    <div className='col px-0 px-md-3 px-xl-5'>
      <div className='card shadow h-100 border-0 overflow-hidden'>
        <div className='row row-cols-1 row-cols-lg-2'>
          <div className="col">
            <div className='card-order-image' style={{ backgroundImage: `url('${image}')` }} />
          </div>
          <div className="col">
            <div className={`card-body z-1`}>
              <h5 className='card-title'>{title}</h5>
              <p className='card-text text-danger fw-bold'>S/{price?.toFixed(2)}</p>
              {
                delivered
                  ? <p className='card-text text-success fw-bold'>Entregado</p>
                  : <p className='card-text text-danger fw-bold'>En lista de espera</p>
              }
              {
                !delivered &&
                <button className='btn btn-danger' onClick={handleCancel} disabled={loading}>
                  Cancelar pedido
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOrder
