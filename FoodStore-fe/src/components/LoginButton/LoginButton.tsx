import LoginSkeleton from '@components/Skeleton/LoginSkeleton';
import { useAuthContext } from '@context';
import { IAuthResponse } from '@core/models/serverResponse';
import { Role } from '@core/models/user';
import { Button, Modal } from 'antd';
import React, { lazy, Suspense, useState } from 'react';
import { HiOutlineLogin } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import style from './index.module.scss';

// const LoginForm = loadable(() => import('../LoginForm'), {
//   fallback: <LoginSkeleton />,
// });
const LoginForm = lazy(() => import('@components/FormComponents').then(form => ({ default: form.LoginForm })));
const RegisterForm = lazy(() => import('@components/FormComponents').then(form => ({ default: form.RegisterForm })));
const SocialForm = lazy(() => import('@components/FormComponents').then(form => ({ default: form.SocialForm })));

const ButtonLogin = () => {
  const [showModal, setShowModal] = useState(false);
  const [formVisible, setFormVisible] = useState('login');
  const { setAuth } = useAuthContext();
  const navigation = useNavigate();

  const onSwitchForm = (type: 'login' | 'register') => {
    setFormVisible(type);
  }

  const turnOffModal = () => {
    setShowModal(false);
    setFormVisible('login');
  }

  const onAuthSuccess = (value: IAuthResponse) => {
    const { accessToken, ...user } = value;
    setAuth({
      refreshToken: accessToken,
      token: accessToken,
      user
    });
    if (user.role === Role.ADMIN) {
      navigation('/admin');
    }
    turnOffModal();
  }

  return (
    <>
      <Button shape="round" icon={<HiOutlineLogin />} size={'large'} className="d-flex align-items-center" onClick={() => setShowModal(true)}>
        Đăng nhập
      </Button>
      <Modal
        title={formVisible === 'login' ? 'Đăng nhập' : 'Đăng ký'}
        centered
        visible={showModal}
        closable={false}
        onOk={turnOffModal}
        onCancel={turnOffModal}
        footer={null}
        width={650}
      >
        <div className={style['container']}>
          <div className={style['left-col']}>
            <Suspense fallback={<LoginSkeleton />}>
              {formVisible === 'login'
                ? <LoginForm onLoginSuccess={onAuthSuccess} onRegister={() => onSwitchForm('register')} />
                : <RegisterForm onRegisterSuccess={onAuthSuccess} onLogin={() => onSwitchForm('login')} />
              }
            </Suspense>
            <div className={style['divider']}></div>
          </div>
          <div className={style['right-col']}>
            <Suspense fallback={null}>
              <SocialForm onSuccess={onAuthSuccess} />
            </Suspense>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ButtonLogin