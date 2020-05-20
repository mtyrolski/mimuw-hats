import got from 'got';
import FormData from 'formdata-node';
import {NextFunction, Request, Response} from 'express';

export class HatsController {
  public async verifyHatImage(req: Request, res: Response, next: NextFunction) {
    if (!('file' in req)) {
      // TODO: custom error handler
      return res.status(408).json({
        error: 'No file provided',
      });
    }

    try {
      const fd = new FormData();
      fd.append('image', req.file.buffer);

      const response = await got.post('http://0.0.0.0:4000/api/hats/mockml', {
        body: fd.stream,
        headers: fd.headers,
      });
      const prediction = JSON.parse(response.body).pred as string;

      if (prediction !== 'hat') {
        return res.status(422).json({
          error: 'Non-hat',
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }

    return next();
  }

  public async createValidHat(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
