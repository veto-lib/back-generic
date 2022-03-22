import { Route } from '../../utils';

import battlesController from './battles.controller';

/**
 * The models routes to mount on /battles.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: battlesController.find
  },
  {
    method: 'post',
    path: '/',
    handler: battlesController.create,
    options: {
      authenticate: true
    }
  }
];

export default routes;
