import stream from 'stream';
import http from 'http';
import {Request, Response} from 'express';

export class HatsController {
  public uploadImage(req: Request, res: Response) {
    if (!('file' in req))
      return res.status(400).json({
        message: 'No file provided',
      });

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    const clientReq = http
      .request(
        {
          host: '0.0.0.0',
          port: 4000,
          path: '/api/hats/mockml',
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
        mlResp => {
          let data = '';
          mlResp.on('data', (chunk: string) => (data += chunk));
          mlResp.on('end', () => {
            const dataJson = JSON.parse(data);
            if (dataJson.pred === 'hat')
              return res.status(200).json({
                message: 'TODO',
              });
            else
              return res.status(422).json({
                message: 'Invalid hat',
              });
          });
        }
      )
      .on('error', err => {
        console.error(err);
        return res.status(404);
      });
    bufferStream.pipe(clientReq);
    return res.status(400);
    // return res.status(200).json(req.body);
  }
}
