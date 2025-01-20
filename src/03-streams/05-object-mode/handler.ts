import {IncomingMessage, ServerResponse} from 'http';
import {readFileSync} from 'fs';
import {Transform} from 'stream';


export const basicHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.write(readFileSync(`${__dirname}/static/index.html`));
    resp.end();
};

export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    if (req.headers['content-type'] == 'application/json') {
        req.pipe(createFromJsonTransform()).on('data', (payload) => {
            if (payload instanceof Array) {
                resp.write(`Received an array with ${payload.length} items: `)
                for (let i = 0; i < payload.length; i++) {
                    resp.write(`${payload[i].id}: ${payload[i].message} `);
                }
            } else {
                resp.write('Did not receive an array');
            }
            resp.end();
        });
    } else {
        req.pipe(resp);
    }
}
const createFromJsonTransform = () => new Transform({
    readableObjectMode: true,
    transform(data, _encoding, callback) {
        callback(null, JSON.parse(data));
    }
});