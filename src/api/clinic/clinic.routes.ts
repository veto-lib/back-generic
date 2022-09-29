import { Route } from '../../utils';

import informationsController from './clinic.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/',
    handler: informationsController.findClinicInfo,
    options: {
      authenticate: true
    }
  },
  {
    method: 'patch',
    path: '/',
    handler: informationsController.updateClinicInfo,
    options: {
      authenticate: true
    }
  }
];

export default routes;
