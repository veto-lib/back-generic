import { createConnection, Connection } from 'typeorm';

/**
 * Attempts to establish a connection with the Mongo database.
 * @returns a database object if the connection is established.
 */
export const databaseConnection = async (): Promise<Connection> => {
  return createConnection();
};
