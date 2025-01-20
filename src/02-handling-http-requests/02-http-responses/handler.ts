import {IncomingMessage, ServerResponse} from 'http';
import {URL} from 'url';

// open http://localhost:5000/?keyword=Andy

export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    const parsedURL = new URL(req.url ?? '', `http://${req.headers.host}`);
    resp.sendDate = true;
    resp.setHeader('Content-Type', 'text/plain');
    resp.setHeader('Server', 'Node.js');
    if (req.method !== 'GET') {
        resp.writeHead(404, 'Not Found');
        resp.end();
        return;
    } else {
        resp.writeHead(200, 'OK');
        if (!parsedURL.searchParams.has('keyword')) {
            resp.write('Hello, HTTP');
        } else {
            resp.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
        }
        resp.end();
        return;
    }
};