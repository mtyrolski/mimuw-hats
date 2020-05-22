// eslint-disable-next-line node/no-extraneous-import
import FormData from 'form-data';
import got from 'got';

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
      fd.append('image', req.file.buffer, {filename: 'image.jpg'});

      const response = await got.post(
        'http://students.mimuw.edu.pl:5000/predict_binary',
        {
          body: fd,
        }
      );
      const predictionObj = JSON.parse(response.body);
      if (!('pred' in predictionObj))
        return next(new BadRequest('Model didnt want to predict.'));

      if (predictionObj.pred !== 'hat') {
        return next(new UnprocessableEntity('Provided item is not a hat.'));
      }
    } catch (err) {
      return next(new GatewayTimeout(err.message));
    }

    return next();
  }

  public async createValidHat(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      succ: 'ok',
    });
  }
}
