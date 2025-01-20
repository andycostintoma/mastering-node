import {handler, redirectionHandler} from './handler';
import {readFileSync} from 'fs';
import {join, dirname} from 'path';
import {createServer} from 'http';
import {createServer as createHttpsServer} from 'https';

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

const httpsServer = createHttpsServer(httpsConfig, handler);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));