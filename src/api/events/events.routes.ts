import { Route } from '../../utils';

import eventsController from './events.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/:id',
    handler: eventsController.findOne,
    options: {
      authenticate: true
    }
  },
  {
    method: 'patch',
    path: '/:id',
    handler: eventsController.updateNotes,
    options: {
      authenticate: true
    }
  },
  {
    method: 'delete',
    path: '/:id',
    handler: eventsController.remove,
    options: {
      authenticate: true
    }
  },
  {
    method: 'post',
    path: '/',
    handler: eventsController.create,
    options: {
      authenticate: true
    }
  }
];

export default routes;
