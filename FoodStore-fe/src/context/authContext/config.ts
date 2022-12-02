import { Gender, Role } from "@core/models/user";
import { createContext, useContext } from "react";
import { IAuthContext } from "../../core/models/config";


export const defaultAuthState = {
  token: '',
  refreshToken: '',
  user: {
    email: '',
    name: '',
    point: 0,
    phone: '',
    role: Role.CUSTOMER,
    gender: Gender.none
  }
}

export const AuthContext = createContext<IAuthContext>({
  setAuth: () => ({}),
  auth: defaultAuthState,
  logout: () => ({})
})

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
