import { ShoppingCartOutlined } from '@ant-design/icons';
import ProductDentailInfo from '@components/ProductDentailInfo/ProductDentailInfo';
import { useAuthContext, useCartContext } from '@context';
import { STATUS_CODE } from '@core/constant/setting';
import { CurrencyWithCommas, parseJSON, productToCartRequest } from '@core/helpers/converter';
import { IProductMetaData, SuggestPropertyProduct } from '@core/models/order';
import { IProductDetail, ServerResponse } from '@core/models/serverResponse';
import { getProductDetail } from '@services/productsService';
import { Button, Col, InputNumber, message, Radio, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaShippingFast } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';



const ProductDetail = () => {

  const id = useParams().productId;
  const [product, setProduct] = useState<IProductDetail>({} as IProductDetail);
  const { auth: { token } } = useAuthContext();
  const { carts, addToCart } = useCartContext();
  const [productQuantity, setProductQuantity] = useState({} as IProductMetaData);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const isLogin = token !== '';

  useEffect(() => {
    if (id) {
      getAll(+id);
    }
  }, [id])

  const getAll = async (id: number) => {
    const data = await getProductDetail(id);
    if (data.code === STATUS_CODE.SUCCESS) {
      setProduct(data.data);
      return data;
    }
    return null;
  }

  const handleProductPropertySelected = (meta: IProductMetaData) => {
    setProductQuantity(meta);
    if (id) {
      const cart = carts.find(cart => cart.productId === +id);
      if (cart) {
        const quantity = cart.metadataProperty
          .find(metaCart =>
            metaCart.configurationName === meta.configurationName
            && metaCart.options === meta.options
          )?.quantity || 0;
        setQuantity(quantity);
      }
    }
  }

  const filterMetadataProperty = (type: SuggestPropertyProduct) => product.metadataProperty?.filter(meta => meta.configurationName === type) || [];

  const colorSizeOption = filterMetadataProperty(SuggestPropertyProduct.size_color);

  const updateQuantity = (opt: '+' | '-') => {
    console.log(opt);
    if (opt === '+') {
      setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1 < 1 ? 0 : quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (!isLogin) {
      message.error('Bạn phải đặng nhập để sử dụng tính năng này');
      return;
    }
    addToCart(productToCartRequest(product, productQuantity, quantity));
  }

  const toOrder = () => {
    if (!isLogin) {
      message.error('Bạn phải đặng nhập để sử dụng tính năng này');
      return;
    }
    handleAddToCart();
    navigate('/order');
  }

  if (!product.id) return <Skeleton />

  return (
    <div>
      <Row className='product_infomation'>
        <Col span={9} className='product_infomation_image'>
          <div className='product_infomation_image_header'>
            {/* <img src={img} alt="" /> */}
            <img src={product?.imageUrl} alt="" />
          </div>

        </Col>
        <Col span={10} className='product_infomation_product'>
          <div className='product_infomation_product_name' >
            <p >{product?.name}</p>
          </div>
          <Row className='mb-8'>
            <Col className='product_infomation_product_content'><b>Mô tả sản phẩm</b>: {product.description}  </Col>
          </Row>
          <hr />
          <div className='product_infomation_product_price'>
            {`Giá: ${CurrencyWithCommas(product.price)} VNĐ`}
          </div>
          <i>(giá chưa bao gồm phí ship và phụ phí)</i>
          {!isLogin && <div className='product_infomation_product_login'>Đăng nhập để trải nghiệm mua sắm tốt nhất và nhận giá ưu đãi thành viên!</div>}
          <div className='product_infomation_product_time'>
            <Row>
              <Col span={4} style={{ alignSelf: 'center' }}>
                <FaShippingFast style={{ fontSize: '300%', color: '#ffc107' }} />
              </Col>
              <Col span={20}>
                <div>
                  Quý khách sẽ nhận được đơn hàng trong khoảng 20-30 phút ngay sau đặt hàng thành công
                </div>
              </Col>
            </Row>
          </div>
          <Row className='product_infomation_product_quatity'>
            <Col span={12} className="mb-8">
              <div className="product__info__item__quantity">
                <button className="product__info__item__quantity__btn pointer" onClick={() => updateQuantity('-')}>
                  -
                </button>
                <InputNumber type="number" value={quantity} onChange={value => setQuantity(value)} controls={false} />
                <button className="product__info__item__quantity__btn pointer" onClick={() => updateQuantity('+')}>
                  +
                </button>
              </div>

            </Col>
            <Col span={24}>
              <Button type="primary" className='product_infomation_product_cart' icon={<ShoppingCartOutlined />}
                disabled={quantity === 0}
                // >
                onClick={() => handleAddToCart()}
                >
                Thêm vào giỏ hàng
              </Button>
              <Button type="primary" className='product_infomation_product_payment' icon={<ShoppingCartOutlined />}
                disabled={quantity === 0}
                onClick={toOrder}>
                Mua Ngay
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={5} className='product_infomation_page'>
          <ProductDentailInfo />
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail