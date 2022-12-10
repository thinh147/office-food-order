import { STORAGE_KEY } from '@core/constant/setting';
import { getLocalStorage } from '@core/helpers/utils';
import { useEffect, useState } from 'react';
import { IStateAuthContext } from '@core/models/config';
import { defaultAuthState, AuthContext } from './config';
import { useNavigate } from 'react-router';
import { ProviderContextProps } from '@context/ProviderContext';


export const AuthProvider = ({ children }: ProviderContextProps) => {
  const [authState, setAuthState] = useState<IStateAuthContext>(defaultAuthState);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY.TOKEN)) {
      setAuthState({
        refreshToken: getLocalStorage(STORAGE_KEY.REFRESH_TOKEN, ''),
        token: getLocalStorage(STORAGE_KEY.TOKEN, ''),
        user: getLocalStorage(STORAGE_KEY.USER_INFO, {}, true)
      })
    }
  }, []);

  const setAuth = (state: IStateAuthContext) => {
    const { refreshToken, token, user } = state;
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEY.TOKEN, token);
    localStorage.setItem(STORAGE_KEY.USER_INFO, JSON.stringify(user));
    setAuthState(state);
  }

  const logout = () => {
    window.localStorage.clear();
    setAuth(defaultAuthState);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ auth: authState, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;
