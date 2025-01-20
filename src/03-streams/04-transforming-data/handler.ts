import {IncomingMessage, ServerResponse} from 'http';
import {readFileSync} from 'fs';
import {Transform} from 'stream';


export const basicHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.write(readFileSync(`${__dirname}/static/index.html`));
    resp.end();
};

export const readHandler = async (req: IncomingMessage, resp: ServerResponse) => {
    req.pipe(createLowerTransform()).pipe(resp);
}
const createLowerTransform = () => new Transform({
    transform(data, _encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});
