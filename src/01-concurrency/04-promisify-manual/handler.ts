import {IncomingMessage, ServerResponse} from 'http';
import {readFile} from "fs/promises";

const writePromise = (res: ServerResponse, data: any): Promise<void> =>
    new Promise((resolve, reject) => {
        res.write(data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

const endPromise = (res: ServerResponse, data?: any): Promise<void> =>
    new Promise((resolve) => {
        res.end(data, () => {
            resolve();
        });
    });

export const handler = async (_req: IncomingMessage, res: ServerResponse) => {
    try {
        const data: Buffer = await readFile('data.json');
        await writePromise(res, data);
        await endPromise(res, data);
        console.log('File sent');
    } catch (err: any) {
        console.error(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        await endPromise(res);
    }
};
