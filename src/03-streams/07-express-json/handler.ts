import {Request, Response} from 'express';


export const readHandler = async (req: Request, resp: Response) => {
    if (req.headers['content-type'] == 'application/json') {
        const payload = req.body;
        if (payload instanceof Array) {
            resp.json({arraySize: payload.length});
        } else {
            resp.write('Did not receive an array');
        }
        resp.end();
    } else {
        req.pipe(resp);
    }
}
