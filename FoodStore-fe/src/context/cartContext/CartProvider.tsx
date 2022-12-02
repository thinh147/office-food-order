import useAuthContext from '@context/authContext/config';
import usePropertyContext from '@context/propertyContext/config';
import { ProviderContextProps } from '@context/ProviderContext';
import { STATUS_CODE } from '@core/constant/setting';
import { parseJSON } from '@core/helpers/converter';
import { updateItemArray } from '@core/helpers/utils';
import { ICartInfo, ICartItem, IProductMetaData } from '@core/models/order';
import { ICartRequest } from '@core/models/serverRequest';
import { fetchAddToCart, fetchCart, fetchDeleteCart } from '@services/cartService';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { CartContext } from './config';



const CartProvider = ({ children }: ProviderContextProps) => {
  const [carts, setCarts] = useState<ICartItem[]>([]);
  const { property } = usePropertyContext();
  const { auth: { token } } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [cartInfo, setCartInfo] = useState({} as ICartInfo);


  useEffect(() => {
    // call cart first time in web
    if (token && property.exchangeRate) {
      (async () => {
        setLoading(true);
        const response = await fetchCart();
        if (response.code === STATUS_CODE.SUCCESS) {
          const { items, ...props } = response.data;
          setCarts(items.map(item => ({ ...item, yenPrice: exchangeCurrency(item.vndPrice, property.exchangeRate) })));
          setCartInfo({
            ...props,
            totalItemIncludeQuantity: calculateTotalItemWithQuantity(carts),
            totalPriceYen: exchangeCurrency(props.totalPriceVnd, property.exchangeRate)
          })
        }
        setLoading(false);
      })();
    } else {
      setCarts([]);
    }
  }, [token, property]);

  const exchangeCurrency = (price: number, rate: number) => Math.ceil(price / rate);

  const calculateTotalItemWithQuantity = (carts: ICartItem[]) => carts.reduce((acc, cur) => acc + cur.quantity, 0);

  const calculateTotalPrice = (carts: ICartItem[]) => carts.reduce((acc, cur) => acc + cur.quantity * cur.vndPrice, 0);

  useEffect(() => {
    const totals = calculateTotalItemWithQuantity(carts);
    if (carts.length && totals !== cartInfo.totalItemIncludeQuantity) {
      console.log('update cart');
      const totalPrice = calculateTotalPrice(carts);
      setCartInfo(() => ({
        totalItem: carts.length,
        totalItemIncludeQuantity: totals,
        totalPriceVnd: totalPrice,
        totalPriceYen: exchangeCurrency(totalPrice, property.exchangeRate)
      }));
    }
  }, [carts, cartInfo, property]);

  /**
   * 
   * @param cart 
   * use when don't know cart quantity
   * replace metadata if exist
   * else add metadata
   */
  const addToCart = (cart: ICartRequest) => {
    const cache = carts.find(cart => cart.cartId === cart.cartId);
    if (cache) {
      const metadata = parseJSON(cache.metaData, [] as IProductMetaData[]);
      const [requestMetadata] = parseJSON(cart.metaData, [] as IProductMetaData[]);
      const updatedMetadata = updateItemArray(requestMetadata, metadata, 'configurationName', 'options');
      cart.quantity = updatedMetadata.reduce((acc, cur) => acc + cur.quantity, 0);
      cart.metaData = JSON.stringify(updatedMetadata);
    }
    handleEffectAddToCart(cart);
  };

  const handleEffectAddToCart = async (cart: ICartRequest, noti = 'Thêm vào giỏ hàng thành công') => {
    if (loading) {
      message.warn('Hiện đang update giỏ hàng, xin vui lòng thử lại');
      return;
    }
    setLoading(true);
    if (!token) {
      message.error('Bạn phải đặng nhập để thêm vào giỏ hàng')
      return;
    }
    try {
      const response = await fetchAddToCart(cart);
      if (response.code === STATUS_CODE.SUCCESS) {
        message.success(noti);
        const { data } = response;
        data.yenPrice = exchangeCurrency(data.vndPrice, property.exchangeRate);
        setCarts((prev) => updateItemArray(data, prev, 'cardId'));
      } else {
        throw new Error('');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
    setLoading(false);
  }

  const handleEffectDeleteCart = async (params: { id: number }) => {
    setLoading(true);
    const response = await fetchDeleteCart(params);
    if (response.code === STATUS_CODE.SUCCESS) {
      setCarts((prev) => prev.filter(cart => cart.cartId !== params.id));
      message.success('Xóa thành công');
    } else {
      message.error('Xóa thất bại');
    }
    setLoading(false);
  }

  const deleteCart = (cartId: number) => handleEffectDeleteCart({ id: cartId });

  /**
   * 
   * @param cart 
   * use when already modify cart before call update
   */
  const updateCart = (cart: ICartRequest) => {
    handleEffectAddToCart(cart, 'Cập nhật giỏ hàng thành công');
  }

  return (
    <CartContext.Provider value={{ carts, addToCart, deleteCart, updateCart, loading, setLoading: (state) => setLoading(state), cartInfo }} >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider