import {createServer} from 'http';
import {redirectionHandler, newUrlHandler, defaultHandler, notFoundHandler} from './handler';
import {createServer as createHttpsServer} from 'https';
import {readFileSync} from 'fs';
import express, {Express} from 'express';
import {dirname, join} from "path";

const port = 5000;
const server = createServer(redirectionHandler);
server.listen(port, () => console.log(`(Event) Server listening on port ${port}`));

const https_port = 5500;
const certDir = dirname(__dirname) + '/certs';
const keyPath = join(certDir, 'key.pem');
const certPath = join(certDir, 'cert.pem');
const httpsConfig = {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath)
};

// Using express router
const expressApp: Express = express();
expressApp.get('/favicon.ico', notFoundHandler);
expressApp.get('/newurl', newUrlHandler);
expressApp.get('*', defaultHandler);

const httpsServer = createHttpsServer(httpsConfig, expressApp);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));


