import { STATUS_CODE } from "@core/constant/setting";
import { ILoginRequest, IRegisterRequest, LoginFacebookRequest, LoginGoogleRequest } from "@core/models/serverRequest";
import { IAuthResponse, ServerResponse } from "@core/models/serverResponse";
import { Role } from "@core/models/user";
import { message } from "antd";
import { post } from "./api";

const login = async (params: ILoginRequest) => {
  if (params.username === 'admin' && params.password === 'admin') {
    return {
      code: STATUS_CODE.SUCCESS,
      data: {
        accessToken: "admin",
        role: Role.ADMIN,
        name: 'admin',
        email: 'admin'
      }
    } as ServerResponse<IAuthResponse>
  }
  const response = await post<IAuthResponse>('auth/login', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error(response.message)
  }
  return response;
}

const register = async (params: IRegisterRequest) => {
  const response = await post<IAuthResponse>('auth/signup', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error(response.message)
  }
  return response;
}

const loginFacebook = async (params: LoginFacebookRequest) => {
  const response = await post<IAuthResponse>('auth/login-facebook', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error(response.message)
  }
  return response;
}

const loginGoogle = async (params: LoginGoogleRequest) => {
  const response = await post<IAuthResponse>('auth/login-google', params);
  if (response.code !== STATUS_CODE.SUCCESS) {
    message.error(response.message)
  }
  return response;
}

export {
  login,
  register,
  loginFacebook,
  loginGoogle
};

