import { Route } from '../../../utils';

import eventsController from './events.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/:id/events',
    handler: eventsController.findVeterinaryEvents,
    options: {
      authenticate: true
    }
  }
];

export default routes;
