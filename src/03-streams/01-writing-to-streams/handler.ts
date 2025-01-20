import {IncomingMessage, ServerResponse} from 'http';

export const basicHandler = (_req: IncomingMessage, resp: ServerResponse) => {
    resp.setHeader('Content-Type', 'text/plain');
    let i = 0;
    let canWrite = true;
    const writeData = () => {
        console.log('Started writing data');
        do {
            canWrite = resp.write(`Message: ${i++}\n`);
        } while (i < 10_000 && canWrite);
        console.log('Buffer is at capacity');
        if (i < 10_000) {
            resp.once('drain', () => {
                console.log('Buffer has been drained');
                writeData();
            });
        } else {
            resp.end('End');
        }
    }
    writeData();
};
