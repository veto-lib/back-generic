import { Route } from '../../../utils';

import animalsController from './animals.controller';

import documentRoutes from './documents/documents.routes';
import eventRoutes from './events/events.routes';

const routes: Route[] = [
  ...documentRoutes,
  ...eventRoutes,
  {
    method: 'post',
    path: '/:id/animals',
    handler: animalsController.create,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/:id/animals',
    handler: animalsController.findAnimals,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/:customerId/animals/:animalId',
    handler: animalsController.findAnimal,
    options: {
      authenticate: true
    }
  }
];

export default routes;
