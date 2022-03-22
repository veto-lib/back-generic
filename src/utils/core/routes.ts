import { Router, Request, Response } from 'express';

import { connectDatabase, authenticate, noOp } from '../../middlewares';

/**
 * Represents the possible values for the API's endpoints HTTP methods.
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

/**
 * Represents a configurable object you can pass to a Route to define specific behavior.
 */
export interface RouteOptions {
  authenticate?: boolean;
}

/**
 * Represents a route of the API.
 */
export interface Route {
  method: HttpMethod;
  path: string;
  handler: (...args: any) => Promise<any>;
  options?: RouteOptions;
}

/**
 * Represents an array of routes to be mounted on the given path.
 */
export interface Path {
  path: string;
  routes: Route[];
}

/**
 * Mounts the API's route into an Express router object.
 * @param paths the list of prefixed routes to mount.
 * @returns the configured Express router.
 */
export const buildRoutes = (paths: Path[]): Router => {
  const router = new (Router as any)();

  paths.forEach(p => {
    p.routes.forEach(r => {
      router[r.method](
        p.path + r.path,
        r?.options?.authenticate ? authenticate() : noOp,
        connectDatabase(r.handler),
        (request: Request, response: Response) => response.json(request.app.locals.result)
      );
    });
  });

  return router;
};
