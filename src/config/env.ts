import dotenv from 'dotenv';
import path from 'path';

import { getKeysEndingWith, getOsEnvOptional, normalizePort, toBool, toNumber } from '~/utils';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnvOptional('APP_NAME', 'Id Service'),
        host: getOsEnvOptional('APP_HOST', '0.0.0.0'),
        schema: getOsEnvOptional('APP_SCHEMA', 'http'),
        port: normalizePort(process.env.PORT || getOsEnvOptional('APP_PORT', '5000')),
        authRealm: getOsEnvOptional('AUTH_REALM'),
        authServerUrl: getOsEnvOptional('AUTH_SERVER_URL'),
        authClientId: getOsEnvOptional('AUTH_CLIENT_ID'),
        sessionSecret: getOsEnvOptional('SESSION_SECRET'),
        serviceAccountClientId: getOsEnvOptional('SERVICE_ACCOUNT_CLIENT_ID'),
        serviceAccountClientSecret: getOsEnvOptional('SERVICE_ACCOUNT_CLIENT_SECRET'),
        secure: toBool(getOsEnvOptional('SECURE', 'true')),
        defaultUser: getOsEnvOptional('DEFAULT_USER_ID', ''),
    },
    db: {
        database: getOsEnvOptional('PG_DATABASE'),
        host: getOsEnvOptional('PG_HOST'),
        port: toNumber(getOsEnvOptional('PG_PORT')),
        username: getOsEnvOptional('PG_USERNAME'),
        password: getOsEnvOptional('PG_PASSWORD'),
    },
    entities: {
        type: getKeysEndingWith('_TYPE'),
    },
};
