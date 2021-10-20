import React from 'react'
import './ProductCard.css'
import { IProduct } from '../../utils/types'

function ProductCard({ id, name, image, prices }: IProduct) {
  return (
    <div className='product-card' key={id}>
      {/* We only want to show the discount label if there is a discount  */}

      {prices.discount_percentage > 0 && (
        <div className='discount'>
          <span>- {prices.discount_percentage} %</span>
        </div>
      )}
      <div className='image'>
        <img src={image} alt='product image' />
      </div>
      <div className='title'>{name}</div>
      {prices.discount_percentage > 0 && (
        <div className='price'>
          <span>
            {Math.round(
              prices.recommended_retail_price -
                (prices.recommended_retail_price * prices.discount_percentage) /
                  100
            )}
            DKK
          </span>
        </div>
      )}
      {prices.discount_percentage > 0 ? (
        <span className='old-price'>{prices.recommended_retail_price} DKK</span>
      ) : (
        <div className='price'>
          <span>{prices.recommended_retail_price} DKK</span>
        </div>
      )}
    </div>
  )
}

export default ProductCard
