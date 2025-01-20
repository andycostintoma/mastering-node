import {createServer} from 'http';
import {handler} from './handler';


const port = 5000;
const server = createServer(handler);
server.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});


/* same logic that uses events directly
server.on('request', handler)
server.listen(port);
server.on('listening', () => {
    console.log(`(Event) Server listening on port ${port}`);
});
*/
