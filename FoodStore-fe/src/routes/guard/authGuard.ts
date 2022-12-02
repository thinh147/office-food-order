import { useAuthContext } from '../../context';

export const authGuard = () => {
  const { auth: { token } } = useAuthContext();
  return token !== '';
}
