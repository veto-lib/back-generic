import { buildRoutes, Path } from '../utils';

import customersRoutes from './customers/customers.routes';
import veterinariesRoutes from './veterinaries/veterinaries.routes';
import eventsRoutes from './events/events.routes';
import adminRoutes from './admin/admin.routes';
import clinicRoutes from './clinic/clinic.routes';

/**
 * The routes to mount on /api.
 */
const paths: Path[] = [
  { path: '/customers', routes: customersRoutes },
  { path: '/veterinaries', routes: veterinariesRoutes },
  { path: '/events', routes: eventsRoutes },
  { path: '/admin', routes: adminRoutes },
  { path: '/clinic', routes: clinicRoutes }
];

const router = buildRoutes(paths);

export default router;
