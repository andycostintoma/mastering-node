import {createServer} from 'http';
import express, {Express} from 'express';
import {basicHandler, readHandler} from './handler';

const port = 5000;
const expressApp: Express = express();

expressApp.get('/favicon.ico', (_req, resp) => {
    resp.statusCode = 404;
    resp.end();
});
expressApp.get('*', basicHandler);
expressApp.post('/read', readHandler);

const server = createServer(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));


