import { useCartContext } from '@context';
import { calculateTotalQuantity } from '@core/helpers/converter';
import { updateItemArray } from '@core/helpers/utils';
import { ICartItem, IProductMetaData } from '@core/models/order';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.scss';
import OrderCartItemMetadata from './OrderCartItemMetadata';

interface Props {
  cart: ICartItem;
}

const OrderCartItem = ({ cart: { metadataProperty, ...cartData } }: Props) => {
  const { updateCart, deleteCart } = useCartContext();
  const [quantity, setQuantity] = useState(cartData.quantity);

  useEffect(() => {
    if (cartData.quantity === quantity) return;
    const timeout = setTimeout(() => {
      const { vndPrice, channel, metaData } = cartData;
      updateCart({
        ...cartData,
        quantity,
        price: vndPrice,
        channelName: channel,
        metaData
      });
    }, 200);
    return () => {
      clearTimeout(timeout);
    }
  }, [quantity]);


  useEffect(() => {
    setQuantity(cartData.quantity);
  }, [cartData.quantity])

  const updateMetadata = (metadata: IProductMetaData) => {
    const { vndPrice, channel } = cartData;
    const newMetadata = updateItemArray(metadata, metadataProperty, 'configurationName', 'options');
    updateCart({
      ...cartData,
      quantity: calculateTotalQuantity(newMetadata),
      price: vndPrice,
      channelName: channel,
      metaData: JSON.stringify(newMetadata)
    });
  }

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-left">
          <Image src={cartData.image} />
          <div className="detail">
            <h3><Link to={`/product/${cartData.channel}/${cartData.productId}`}>{cartData.productName}</Link></h3>
            <p><b>Nhà cung cấp: </b>{cartData.channel}</p>
          </div>
        </div>
        <div className='cart-item-right d-flex flex-column'>
          {metadataProperty.map((metadata, index) => <OrderCartItemMetadata metadata={metadata} cart={cartData}
            updateMetadata={updateMetadata}
            key={`${metadata.options}_${cartData.productId}_${index}`} />)}
        </div>
      </div>
    </>
  )
}

export default OrderCartItem