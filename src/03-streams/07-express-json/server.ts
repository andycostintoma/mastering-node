import {createServer} from 'http';
import express, {Express, Request, Response} from 'express';
import {readHandler} from './handler';

const port = 5000;
const expressApp: Express = express();

expressApp.post('/read', readHandler);
expressApp.use(express.json());
expressApp.use(express.static((`${__dirname}/static`)));
expressApp.use(express.static('node_modules/bootstrap/dist'));
expressApp.get('/sendcity', (_req, resp) => {
    resp.sendFile('city.png', {root: `${__dirname}/static`});
});
expressApp.get('/downloadcity', (_req: Request, resp: Response) => {
    resp.download(`${__dirname}/static/city.png`);
});
const server = createServer(expressApp);
server.listen(port,
    () => console.log(`HTTP Server listening on port ${port}`));


