import { Route } from '../../utils';

import customersController from './customers.controller';

import eventRoutes from './events/events.routes';
import animalRoutes from './animals/animals.routes';

const routes: Route[] = [
  ...animalRoutes,
  ...eventRoutes,
  {
    method: 'post',
    path: '/',
    handler: customersController.create
  },
  {
    method: 'get',
    path: '/',
    handler: customersController.findCustomers,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/:id',
    handler: customersController.findCustomer,
    options: {
      authenticate: true
    }
  }
];

export default routes;
