import { useAuthContext } from "@context";
import { Role } from '@core/models/user';

export const adminGuard = () => {
  const { auth: { token, user: { role } } } = useAuthContext();
  // return true;
  return token !== '' && role === Role.ADMIN;
}