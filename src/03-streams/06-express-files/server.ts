import {createServer} from 'http';
import express, {Express} from 'express';
import {readHandler} from './handler';

const port = 5000;
const expressApp: Express = express();

expressApp.post('/read', readHandler);
expressApp.use(express.static((`${__dirname}/static`)));
const server = createServer(expressApp);
server.listen(port,
    () => console.log(`HTTP Server listening on port ${port}`));


