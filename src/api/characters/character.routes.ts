import { Route } from '../../utils';

import charactersController from './characters.controller';

/**
 * The models routes to mount on /models.
 */
const routes: Route[] = [
  {
    method: 'get',
    path: '/characters',
    handler: charactersController.findAllPublic
  },
  {
    method: 'get',
    path: '/users/:email/characters',
    handler: charactersController.findAllOfUser,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/users/:email/opponents',
    handler: charactersController.findOpponents,
    options: {
      authenticate: true
    }
  },
  {
    method: 'get',
    path: '/users/:email/characters/:id',
    handler: charactersController.findOneOfUser,
    options: {
      authenticate: true
    }
  },
  {
    method: 'post',
    path: '/users/:email/characters',
    handler: charactersController.create,
    options: {
      authenticate: true
    }
  },
  {
    method: 'put',
    path: '/users/:email/characters/:id',
    handler: charactersController.update,
    options: {
      authenticate: true
    }
  },
  {
    method: 'delete',
    path: '/users/:email/characters/:id',
    handler: charactersController.remove,
    options: {
      authenticate: true
    }
  }
];

export default routes;
