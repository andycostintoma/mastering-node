import {IncomingMessage, ServerResponse} from 'http';
import {readFileSync} from 'fs';


export const basicHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.write(readFileSync(`${__dirname}/static/index.html`));
    resp.end();
};

export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(resp)
}
