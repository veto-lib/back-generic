import { Route } from '../../utils';

import eventsRoutes from './events/events.routes';

import veterinariesController from './veterinaries.controller';

const routes: Route[] = [
  ...eventsRoutes,
  {
    method: 'post',
    path: '/',
    handler: veterinariesController.create
  },
  {
    method: 'get',
    path: '/:email',
    handler: veterinariesController.findOne
  }
];

export default routes;
