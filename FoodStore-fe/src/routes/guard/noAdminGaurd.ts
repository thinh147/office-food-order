import { useAuthContext } from "@context";
import { Role } from '@core/models/user';

export const noAdminGuard = () => {
  const { auth: { token, user: { role } } } = useAuthContext();
  // return true;
  return token === '' || (token !== '' && role !== Role.ADMIN);
}