import {IncomingMessage, ServerResponse} from 'http';
import {promisify} from 'util';
import {readFile} from "fs/promises";

const endPromise = promisify(ServerResponse.prototype.end) as (this: ServerResponse, data?: any) => Promise<void>;
const writePromise = promisify(ServerResponse.prototype.write) as (this: ServerResponse, data: any) => Promise<void>;

export const handler = async (_req: IncomingMessage, res: ServerResponse) => {
    try {
        const data: Buffer = await readFile('data.json');
        await writePromise.call(res, data);
        await endPromise.call(res, data);
        console.log('File sent');
    } catch (err: any) {
        console.error(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        await endPromise.call(res);
    }
};
