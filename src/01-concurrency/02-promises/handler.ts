import {IncomingMessage, ServerResponse} from 'http';

import {readFile} from 'fs/promises';

export const handler = (_req: IncomingMessage, res: ServerResponse) => {
    const p: Promise<Buffer> = readFile('data.json');
    p.then((data: Buffer) => res.end(data, () => console.log('File sent')));
    p.catch((err: Error) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};

// chaining promises.ts
export const handler2 = (_req: IncomingMessage, res: ServerResponse) => {
    readFile('data.json')
        .then((data: Buffer) => res.end(data, () => console.log('File sent')))
        .catch((err: Error) => {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        });
};

// using async/await
export const handler3 = async (_req: IncomingMessage, res: ServerResponse) => {
    try {
        const data: Buffer = await readFile('data.json');
        res.end(data, () => console.log('File sent'));
    } catch (err: any) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};