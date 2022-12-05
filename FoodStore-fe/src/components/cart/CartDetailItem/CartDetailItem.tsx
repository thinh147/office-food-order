import { useCartContext } from '@context'
import { calculateTotalQuantity, CurrencyWithCommas } from '@core/helpers/converter'
import { ICartItem, IProductMetaData } from '@core/models/order'
import { Button, Col, Image, InputNumber, Row, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CartDetailItem = ({ metadataProperty, ...props }: ICartItem) => {
  const { updateCart, loading, deleteCart } = useCartContext();
  const [metadata, setMetadata] = useState([] as IProductMetaData[]);

  useEffect(() => {
    setMetadata([...metadataProperty]);
  }, [metadataProperty])

  useEffect(() => {
    const stateTotal = calculateTotalQuantity(metadata);
    const propsTotal = calculateTotalQuantity(metadataProperty);
    if (stateTotal === propsTotal) return;
    const timeout = setTimeout(() => {
      const { vndPrice, channel, } = props;
      updateCart({
        ...props,
        quantity: stateTotal,
        price: vndPrice,
        channelName: channel,
        metaData: JSON.stringify(metadata),
      })
    }, 200);
    return () => {
      clearTimeout(timeout);
    }
  }, [metadata])


  const handleDeleteItem = () => {
    deleteCart(props.cartId);
  };

  const handleDeleteMetadata = (meta: IProductMetaData, index: number) => {
    if (metadata.length < 2) {
      handleDeleteItem();
    } else {
      setMetadata(prev => {
        prev.splice(index, 1);
        return prev.slice();
      });
    }
  }

  return (
    <Row gutter={8} className="cart-item">
      <Col span={6} className="p-0">
        <Image src={props.image} alt={props.productName} width={200} />
      </Col>
      <Col span={8}>
        <div className="cart-info">
          <h3><Link to={`/product/${props.channel}/${props.productId}`}>{props.productName}</Link></h3>
          {/* <p><b>Nhà cung cấp: </b>{props.channel}</p> */}
          {/* <Tag color="success" className="fz-14">{CurrencyWithCommas(props.vndPrice * quantity, 'đ')}</Tag>
          <Tag color="processing" className="fz-14">Tổng: {CurrencyWithCommas(props.vndPrice * quantity, 'đ')}</Tag> */}
        </div>
      </Col>
      <Col span={10} className="d-flex flex-column justify-content-center align-items-center gap-8">
        {metadata.map(({ configurationName, options, quantity }, index) => (
          <div className="d-flex align-items-center gap-8" key={`${index}_${options}`}>
            <div>
              <Tag color="success" className="fz-14">Đơn giá: {CurrencyWithCommas(props.vndPrice, 'đ')}</Tag>
              <Tag color="processing" className="fz-14">Tổng: {CurrencyWithCommas(props.vndPrice * quantity, 'đ')}</Tag>
            </div>
            <InputNumber
              value={quantity} onChange={(value) => setMetadata(prev => {
                prev.splice(index, 1, { configurationName, options, quantity: value });
                return prev.slice();
              })}
              key={`${props.productId}_${options}_${quantity}`} disabled={loading} />
            <Button type='text' icon={<FaTrashAlt className="icon-trash" style={{ fontSize: '16px' }} />}
              size="large" danger onClick={() => handleDeleteMetadata({ configurationName, options, quantity }, index)} loading={loading}></Button>
          </div>
        ))}
      </Col>
    </Row>
  )
}

export default CartDetailItem