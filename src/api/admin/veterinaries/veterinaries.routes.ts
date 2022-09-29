import { Route } from '../../../utils';

import veterinariesController from './veterinaries.controller';

const routes: Route[] = [
  {
    method: 'patch',
    path: '/veterinaries/:email',
    handler: veterinariesController.validateVeterinary,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/veterinaries',
    handler: veterinariesController.findAllUnvalidated,
    options: {
      authenticate: true
    }
  }
];

export default routes;
