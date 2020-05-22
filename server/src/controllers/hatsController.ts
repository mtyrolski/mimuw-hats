import got from 'got';
import FormData from 'formdata-node';
import {
  BadRequest,
  UnprocessableEntity,
  GatewayTimeout,
} from '@tsed/exceptions';
import {NextFunction, Request, Response} from 'express';

export class HatsController {
  public async verifyHatImage(req: Request, res: Response, next: NextFunction) {
    if (!('file' in req)) return next(new BadRequest('No file specified.'));

    try {
      const fd = new FormData();
      fd.append('image', req.file.buffer);

      const response = await got.post('http://0.0.0.0:4000/api/hats/mockml', {
        body: fd.stream,
        headers: fd.headers,
      });
      const prediction = JSON.parse(response.body).pred as string;

      if (prediction !== 'hat') {
        return next(new UnprocessableEntity('Provided item is not a hat.'));
      }
    } catch (err) {
      return next(new GatewayTimeout(err.message));
    }

    return next();
  }

  public async createValidHat(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
