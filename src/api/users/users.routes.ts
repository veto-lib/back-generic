import { Route } from '../../utils';

import usersController from './users.controller';

/**
 * The models routes to mount on /models.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: usersController.list
  },
  {
    method: 'get',
    path: '/:email',
    handler: usersController.findOne
  },
  {
    method: 'post',
    path: '/',
    handler: usersController.create
  }
];

export default routes;
