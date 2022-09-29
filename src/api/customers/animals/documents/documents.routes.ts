import { Route } from '../../../../utils';

import documentsController from './documents.controller';

const routes: Route[] = [
  {
    method: 'get',
    path: '/:customerId/animals/:animalId/documents',
    handler: documentsController.findAnimalDocuments,
    options: {
      authenticate: true
    }
  },
  {
    method: 'post',
    path: '/:customerId/animals/:animalId/documents',
    handler: documentsController.postAnimalDocument,
    options: {
      authenticate: true
    }
  }
];

export default routes;
