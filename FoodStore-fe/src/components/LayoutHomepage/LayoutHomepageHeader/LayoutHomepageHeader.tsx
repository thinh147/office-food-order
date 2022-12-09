import logo from '../../../assets/image/logo.png';
import Cart from '@components/cart';
import ButtonLogin from '@components/LoginButton';
import { useAuthContext } from '@context';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutHeaderCategories from '@components/LayoutHomepage/LayoutHeaderCategories';
import LayoutHomepageSearch from '../LayoutHomepageSearch';
import LayoutHomepageProfile from '../LayoutHomepageProfile';


function LayoutHomepageHeader() {
  const { auth: { token } } = useAuthContext();
  const navigate = useNavigate();
  const isLogin = token !== '';

  return (
    <Header  className='container_header' color='primary'style={{backgroundColor: "fcdb99"}} >
      <div className='container_header__main'>
        <div className="logo pointer" style={{minWidth: "50px"}} onClick={() => navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <LayoutHomepageSearch />
        <div className='d-flex align-items-center gap-20'>
          {isLogin
            ? <>
              <Cart />
              <LayoutHomepageProfile />
            </>
            : <ButtonLogin />}
        </div>
      </div>
      <div className="container_header categories">
        <div className='container_header__main'>
          <LayoutHeaderCategories />
        </div>
      </div>
    </Header>
  )
}

export default LayoutHomepageHeader