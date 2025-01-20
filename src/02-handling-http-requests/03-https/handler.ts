import {IncomingMessage, ServerResponse} from 'http';
import {TLSSocket} from 'tls';
import {URL} from 'url';

export const isHttps = (req: IncomingMessage): boolean => {
    return req.socket instanceof TLSSocket && req.socket.encrypted;
}

export const redirectionHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(302, {
        'Location': 'https://localhost:5500'
    });
    resp.end();
}

export const handler = (req: IncomingMessage, resp: ServerResponse) => {
    const protocol = isHttps(req) ? 'https' : 'http';
    const parsedURL = new URL(req.url ?? '', `${protocol}://${req.headers.host}`);
    if (req.method !== 'GET') {
        resp.writeHead(404, 'Not Found');
        resp.end();
        return;
    } else {
        resp.writeHead(200, 'OK');
        if (!parsedURL.searchParams.has('keyword')) {
            resp.write(`Hello, ${protocol.toUpperCase()}`);
        } else {
            resp.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
        }
        resp.end();
        return;
    }
};