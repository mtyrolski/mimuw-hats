// eslint-disable-next-line node/no-extraneous-import
import FormData from 'form-data';
import {writeFile} from 'fs';
import got from 'got';
import {v4 as uuidv4} from 'uuid';

import {
  BadRequest,
  UnprocessableEntity,
  GatewayTimeout,
} from '@tsed/exceptions';
import {NextFunction, Request, Response} from 'express';
import {HATS_STORAGE_DIR, ML_BINARY_CLASSIFIER_URL} from '../util/secrets';

export class HatsController {
  public async verifyHatImage(req: Request, res: Response, next: NextFunction) {
    if (!('file' in req)) return next(new BadRequest('No file specified.'));

    try {
      const fd = new FormData();
      fd.append('image', req.file.buffer, {filename: 'image.jpg'});

      const response = await got.post(ML_BINARY_CLASSIFIER_URL, {
        body: fd,
      });
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

  public async saveHat(req: Request, res: Response, next: NextFunction) {
    // TODO: include email in uuid
    const newFilename = uuidv4() + '.jpg';
    writeFile(`${HATS_STORAGE_DIR}/${newFilename}`, req.file.buffer, err => {
      // TODO: better error handling, maybe sync write?
      if (err) console.error(err);
    });
    return res.status(200).json({
      ok: 'yup',
    });
  }
}
