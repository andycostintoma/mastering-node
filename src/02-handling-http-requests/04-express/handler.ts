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
export const notFoundHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(404, 'Not Found');
    resp.end();
}
export const newUrlHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(200, 'OK');
    resp.write('Hello, New URL');
    resp.end();
}
export const defaultHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(200, 'OK');
    const protocol = isHttps(req) ? 'https' : 'http';
    const parsedURL = new URL(req.url ?? '', `${protocol}://${req.headers.host}`);
    if (!parsedURL.searchParams.has('keyword')) {
        resp.write(`Hello, ${protocol.toUpperCase()}`);
    } else {
        resp.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
    }
    resp.end();
}