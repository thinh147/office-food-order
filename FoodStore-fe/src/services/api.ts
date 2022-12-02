import { STATUS_CODE, STORAGE_KEY } from "@core/constant/setting";
import { getLocalStorage } from "@core/helpers/utils";
import { ServerResponse } from "@core/models/serverResponse";
import { message } from "antd";

const DOMAIN = import.meta.env.VITE_API; //localhost:3000/order-1993/

interface IError {
  message: string;
}

const optionDefault: RequestInit = {
  method: 'GET',
  cache: 'no-cache',
  credentials: 'include'
}

const getHeaderConfig = (isFormData?: boolean): HeadersInit => {
  const token = getLocalStorage(STORAGE_KEY.TOKEN, '');
  const Authorization = token ? `Bearer ${token}` : ''
  const header: HeadersInit = {
    Authorization
  }
  if (!isFormData) {
    header['Content-type'] = 'application/json; charset=UTF-8';
  }
  return header
}

const request = async <T>(url: string, option: RequestInit): Promise<ServerResponse<T>> => {
  try {
    const response = await fetch(url, option)
      .then<ServerResponse<T>>(res => res.ok
        ? res.json()
        : handleRequestFailed({ message: res.statusText })
      )
    if (response.code === STATUS_CODE.NOT_AUTHORIZED) {
      handleUnAuthorized();
    }
    return response;
  } catch (err) {
    return handleRequestFailed(err as IError);
  }
}

const get = async <T>(url: string, params: { [key: string]: any }, headers?: HeadersInit, control?: AbortController): Promise<ServerResponse<T>> => {
  const queryString = new URLSearchParams(params).toString();
  url = `${DOMAIN}${url}${queryString !== '' ? `?${queryString}` : ''}`;
  const option = {
    ...optionDefault,
    signal: control?.signal,
    headers: headers || getHeaderConfig()
  }
  return request<T>(url, option);
}

const post = async <T>(url: string, params: unknown, headers?: HeadersInit, control?: AbortController): Promise<ServerResponse<T>> => {
  url = `${DOMAIN}${url}`;
  const options = {
    ...optionDefault,
    signal: control?.signal,
    method: 'POST',
    body: params instanceof FormData ? params : JSON.stringify(params),
    headers: headers || getHeaderConfig(params instanceof FormData)
  }
  return request<T>(url, options);
}

const put = async <T>(url: string, params: unknown, headers?: HeadersInit, control?: AbortController): Promise<ServerResponse<T>> => {
  url = `${DOMAIN}${url}`;
  const options = {
    ...optionDefault,
    signal: control?.signal,
    method: 'PUT',
    body: params instanceof FormData ? params : JSON.stringify(params),
    headers: headers || getHeaderConfig(params instanceof FormData)
  }
  return request<T>(url, options);
}

const deleteRequest = async <T>(url: string, params: { [key: string]: string }, control?: AbortController): Promise<ServerResponse<T>> => {
  const queryString = new URLSearchParams(params).toString();
  url = `${DOMAIN}${url}${queryString ? `?${queryString}` : ''}`;
  const options = {
    ...optionDefault,
    signal: control?.signal,
    method: 'DELETE',
    headers: getHeaderConfig()
  }
  return request<T>(url, options);
}

const handleUnAuthorized = () => {
  window.localStorage.clear();
  window.location.href = '/';
  message.error('Bạn cần phải đăng nhập');
}

const handleRequestFailed = <T>(err: IError): ServerResponse<T> => {
  if (err?.message) {
    message.error({
      content: err?.message,
      style: {
        zIndex: 1002
      }
    });
  }
  return {
    code: STATUS_CODE.REQUEST_FAILED,
    data: {} as T,
    message: err?.message
  }
}

export {
  get,
  post,
  put,
  deleteRequest
} 