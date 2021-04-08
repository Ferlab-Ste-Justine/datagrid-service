import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Response } from 'express';
import session from 'express-session';
import Keycloak, { KeycloakConfig, KeycloakOptions } from 'keycloak-connect';
import morgan from 'morgan';

import { env } from './config/env';
import router from './router';

const memoryStore = new session.MemoryStore();
const app = express();

app.use(
    session({
        secret: env.app.sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

if (env.app.secure) {
    const keycloakConfig: KeycloakConfig = {
        resource: env.app.authClientId,
        'bearer-only': true,
        'auth-server-url': env.app.authServerUrl,
        realm: env.app.authRealm,
        'ssl-required': '',
        'confidential-port': '',
    };
    const keycloakOptions: KeycloakOptions = {
        store: memoryStore,
    };

    const keycloak = new Keycloak(keycloakOptions, keycloakConfig);
    app.use(keycloak.middleware());
    app.all('*', keycloak.protect(), (req: any, res, next) => {
        req.user = req.kauth.grant.access_token.content.sub;
        next();
    });
} else {
    app.all('*', (req: any, res, next) => {
        req.user = env.app.defaultUser;
        next();
    });
}

// Default route
const defaultRoute = (_, res: Response) => {
    res.sendStatus(404);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(cors());

app.use('/', router);
app.use(defaultRoute); // default route has to be last route

export default app;
