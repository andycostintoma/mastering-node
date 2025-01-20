import {IncomingMessage, ServerResponse} from 'http';

const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;
export const handler = async (_req: IncomingMessage, res: ServerResponse) => {
    const request = shared_counter++;
    const iterate = async (iter: number = 0) => {
        for (let count = 0; count < total; count++) {
            count++;
        }
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        res.write(msg + '\n');
        if (iter == iterations - 1) {
            res.end('Done')
        } else {
            setImmediate(() => iterate(++iter));
        }
    }
    await iterate();
};