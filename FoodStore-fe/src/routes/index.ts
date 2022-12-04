import adminRoutes from './admin';
import userRoutes from './user';
import shipperRoutes from './shipper';

const routes = [
  ...userRoutes,
  ...adminRoutes,
  ...shipperRoutes
]

export default routes;