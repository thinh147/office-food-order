import MercariImg from '@assets/image/mercari.png'
import useCategoriesContext from '@context/categoriesContext/config'
import React from 'react'
import { SiAmazon } from 'react-icons/si'
import { AiOutlinePullRequest } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import LayoutHeaderCategoryItem from '../LayoutHeaderCategoryItem'
import style from './index.module.scss'
import { useAuthContext } from '@context'
import { message } from 'antd'

const LayoutHeaderCategories = () => {
  const { getMainCategories } = useCategoriesContext();
  const navigation = useNavigate();
  const { auth: { token } } = useAuthContext();

  const amazon = getMainCategories().filter(category => category.channel === 'amazon');
  const mercari = getMainCategories().filter(category => category.channel === 'mercari');
  const isLogin = token !== '';
  const fastOrderHandler = () => {
    if (!isLogin) {
      message.error('Bạn phải đặng nhập để sử dụng tính năng này');
      return;
    }
    navigation(`order/fast-order`);
  }

  return (
    <div className={style['categories-wrapper']}>
      <LayoutHeaderCategoryItem categories={amazon} page='amazon'>
        <Link to={'product/amazon'} className={style['link']}>
          <div className={style['category']} >
            <SiAmazon />
            <span>Đồ ăn</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      <LayoutHeaderCategoryItem categories={mercari} page="mercari">
        <Link to={`product/mercari`} className={style['link']}>
          <div className={style['category']} >
            <img src={MercariImg} alt="Mercari" height="25" />
            <span>Thức uống</span>
          </div>
        </Link>
      </LayoutHeaderCategoryItem>
      {/* <Link to={`order/fast-order`} className={style['link']}> */}
      <div className={`${style['category']} pointer`} onClick={fastOrderHandler}>
        <AiOutlinePullRequest />
        <span>Đặt hàng theo yêu cầu</span>
      </div>
      {/* </Link> */}
    </div>
  )
}

export default LayoutHeaderCategories