import { useCartContext } from '@context';
import { CurrencyWithCommas } from '@core/helpers/converter'
import { ICartItem, IProductMetaData } from '@core/models/order';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'

interface Props {
  metadata: IProductMetaData;
  cart: Omit<ICartItem, 'metadataProperty'>;
  updateMetadata: (metadata: IProductMetaData) => void
}

const OrderCartItemMetadata = ({ metadata, cart, updateMetadata }: Props) => {
  const { loading } = useCartContext();
  const [quantity, setQuantity] = useState(metadata.quantity);

  useEffect(() => {
    if (metadata.quantity === quantity) return;
    const timeout = setTimeout(() => {
      updateMetadata({ ...metadata, quantity });
    }, 200);
    return () => {
      clearTimeout(timeout);
    }
  }, [quantity]);


  useEffect(() => {
    setQuantity(metadata.quantity);
  }, [metadata.quantity])

  const handleDecreaseQuantity = (event: React.MouseEvent) => {
    //  
    event.preventDefault();
    event.stopPropagation();
    setQuantity(prev => prev - 1);
  };

  const handleIncreaseQuantity = (event: React.MouseEvent) => {
    //  
    event.preventDefault();
    event.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDeleteItem = () => {
    // deleteCart(cartData.productId);
  };
  return (
    <div className="d-flex text-center align-items-center">
      <div className="input-controller">
        <span
          className="input-number-decrement"
          onClick={handleDecreaseQuantity}
        >
          <FaMinus className="icon-mt" />
        </span>
        <input
          className="input-number"
          type="text"
          value={quantity}
          onChange={(event) => setQuantity(+event.target.value)}
          min="0"
          max="100"
          disabled={loading}
        />
        <span
          className="input-number-increment"
          onClick={handleIncreaseQuantity}
        >
          <FaPlus className="icon-mt" />
        </span>
      </div>
      <div className="cart-item-price">
        <span>{CurrencyWithCommas(cart.vndPrice)} đ</span>
      </div>
      <div className="cart-item-price">
        <span>
          {CurrencyWithCommas(cart.vndPrice * metadata.quantity)} đ
        </span>
      </div>
      {/* <div className="cart-item-delete"> */}
      <Button
        type="text"
        onClick={handleDeleteItem}
        danger
      >
        <FaTrashAlt className="icon-trash" />
      </Button>
      {/* </div> */}
    </div>
  )
}

export default OrderCartItemMetadata