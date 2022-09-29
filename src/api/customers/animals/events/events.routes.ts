import { Route } from '../../../../utils';

import eventsController from './events.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/:customerId/animals/:animalId/events',
    handler: eventsController.findAnimalEvents,
    options: {
      authenticate: true
    }
  }
];

export default routes;
