import { Route } from '../../utils';

import veterinariesRoutes from './veterinaries/veterinaries.routes';

import adminController from './admin.controller';

const routes: Route[] = [
  ...veterinariesRoutes,
  {
    method: 'get',
    path: '/:email',
    handler: adminController.findOne
  }
];

export default routes;
