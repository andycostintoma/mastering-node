import {createServer} from 'http';
import {handler} from './handler';

const port = 5000;
const server = createServer(handler);
server.listen(port,
    () => console.log(`(Event) Server listening on port ${port}`));
