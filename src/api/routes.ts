import { buildRoutes, Path } from '../utils';

import usersRoutes from './users/users.routes';
import charactersRoutes from './characters/character.routes';
import battlesRoutes from './battles/battles.routes';
import qualityRoutes from './quality/quality.routes';

/**
 * The routes to mount on /api.
 */
const paths: Path[] = [
  { path: '/users', routes: usersRoutes },
  { path: '', routes: charactersRoutes },
  { path: '/battles', routes: battlesRoutes },
  { path: '', routes: qualityRoutes }
];

const router = buildRoutes(paths);

export default router;
