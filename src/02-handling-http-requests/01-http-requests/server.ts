import {createServer} from 'http';
import {handler} from './handler';

const port = 5000;
const server = createServer();

server.on('request', handler);
server.listen(port);
server.on('listening', () => {
    console.log(`(Event) Server listening on port ${port}`);
});


/* same logic with convenience functions
const server = createServer(handler);
server.listen(port,
    () => console.log(`(Event) Server listening on port ${port}`));
*/
