import {IncomingMessage, ServerResponse} from 'http';
import {readFileSync} from 'fs';


export const basicHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.write(readFileSync(`${__dirname}/static/index.html`));
    resp.end();
};

export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
    req.setEncoding('utf-8');
    req.on('data', (data: string) => {
        console.log(data);
    });
    req.on('end', () => {
        console.log('End: all data read');
        resp.end();
    });
}


/* Reading data with an iterator
export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.setEncoding('utf-8');
    for await (const data of req) {
        console.log(data);
    }
    console.log('End: all data read');
    resp.end();
}
*/
