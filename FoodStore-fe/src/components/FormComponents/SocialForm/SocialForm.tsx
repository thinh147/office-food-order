import { Button, message } from 'antd';
import React from 'react'
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import style from './index.module.scss';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { loginFacebook } from '@services/authService';
import { loginGoogle } from '@services/authService';
import { IAuthResponse, ServerResponse } from '@core/models/serverResponse';
import { STATUS_CODE } from '@core/constant/setting';
import { LoginFacebookRequest } from '@core/models/serverRequest';
interface Props {
  onSuccess: (data: IAuthResponse) => void;
}

const SocialForm = ({ onSuccess }: Props) => {

  const componentClicked = () => {
    console.log('clock')
  }

  const responseFacebook = async (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if (!(response as ReactFacebookFailureResponse).status) {

      const { accessToken, userID, email, name } = response as ReactFacebookLoginInfo;
      const result = await loginFacebook({ accessToken, email: email || '', name: name || '', userId: userID });
      handleResponse(result);
    }
  }

  const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!response.code) {
      const { accessToken, profileObj } = response as GoogleLoginResponse;
      const result = await loginGoogle({ accessToken, userGoogleInfo: profileObj });
      handleResponse(result);
    }
  }

  const handleResponse = (result: ServerResponse<IAuthResponse>) => {
    if (result.code === STATUS_CODE.SUCCESS) {
      onSuccess(result.data);
    }
  }
  return (
    <div className={style['container']}>
      <div className={style['btn-group']}>
        <FacebookLogin
          appId={import.meta.env.VITE_FACEBOOK_APPID}
          fields="name,email,picture"
          cssClass={style['my-facebook-button-class']}
          icon={<FaFacebook style={{ fontSize: '32px', color: '#4267B2', marginRight: '8px' }} />}
          textButton="Facebook"
          onClick={componentClicked}
          callback={responseFacebook} />
        {/* <span className={style['text-facebook']}>Facebook</span> */}
      </div>
      <div className={style['btn-group']}>
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Button icon={<FcGoogle style={{ fontSize: '32px' }} />} className={style['btn-google']} onClick={renderProps.onClick} disabled={renderProps.disabled} size='large' type='text'>
              <span className={style['text-google']}>Google</span>
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      </div>
    </div>
  )
}

export default SocialForm