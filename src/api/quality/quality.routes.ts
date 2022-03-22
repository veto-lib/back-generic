import { Route } from '../../utils';

import qualityController from './quality.controller';

/**
 * The models routes to mount on /quality.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/users/:email/characters/:id/analysis',
    handler: qualityController.analyse,
    options: {
      authenticate: true
    }
  }
];

export default routes;
