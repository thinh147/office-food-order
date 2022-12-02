import adminRoutes from './admin';
import userRoutes from './user';

const routes = [
  ...userRoutes,
  ...adminRoutes
]

export default routes;