import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
 * Application configuration object.
 */
export const CONFIG = {
  port: process.env.API_PORT,
  auth: {
    tenantId: process.env.AZURE_TENANT,
    clientId: process.env.AZURE_CLIENT_ID,
    get identityMetadata(): string {
      return `https://login.microsoftonline.com/${this.tenantId}/v2.0/.well-known/openid-configuration`;
    },
    audience: process.env.AZURE_AUDIENCE,
    get issuer(): string {
      return `https://login.microsoftonline.com/${this.tenantId}/v2.0`;
    }
  },
  database: {
    port: +(process.env.DATABASE_PORT ?? 3306),
    host: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_DBNAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: JSON.parse(process.env.DATABASE_SSL ?? 'false')
      ? { rejectUnauthorized: false }
      : false
  }
};
