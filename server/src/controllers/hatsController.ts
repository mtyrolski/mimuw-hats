// eslint-disable-next-line node/no-extraneous-import
import FormData from 'form-data';
import got from 'got';

import {
  BadRequest,
  UnprocessableEntity,
  GatewayTimeout,
  NotFound,
  InternalServerError,
} from '@tsed/exceptions';
import {NextFunction, Request, Response} from 'express';

import {Hat, LosableItem} from '../models/hat';
import {Post} from '../models/post';
import {
  HATS_STORAGE_DIR,
  HATS_STORAGE_ENDPOINT,
  ML_BINARY_CLASSIFIER_URL,
} from '../util/secrets';

import {getUserIdFromRequest} from './userController';
import {FileStorage} from '../util/FileStorage';

export class HatsController {
  #hatsFileManager: FileStorage;

  constructor() {
    this.#hatsFileManager = new FileStorage(
      HATS_STORAGE_DIR,
      HATS_STORAGE_ENDPOINT
    );
  }

  private static async findUsersHat(
    hatId: string,
    userId: string,
    next: NextFunction
  ) {
    return Hat.findById(hatId, (err, hat) => {
      err =
        err || hat?.owner.toString() !== userId
          ? err
            ? new InternalServerError('DB error')
            : new NotFound('No hat with given ID.')
          : null;
      if (err) return next(err);
    });
  }

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
    const newFilename = this.#hatsFileManager.saveAndReturnFilename(
      req.file.buffer
    );

    const lost = (req.query.lost === 'true') as boolean;
    // TODO: remove mock
    const userId = lost ? null : getUserIdFromRequest(req);
    await new Hat({
      owner: userId,
      name: req.body.metadata || '',
      fileName: newFilename,
      imageUrl: this.#hatsFileManager.getFileUrl(newFilename),
    }).save((err, hat) => {
      if (err) return next(new InternalServerError('DB error: ' + err));
      return res.status(200).json(hat);
    });
  }

  public async getUsersHats(req: Request, res: Response, next: NextFunction) {
    const userId = getUserIdFromRequest(req);
    await Hat.find({owner: userId}, (err, hats: LosableItem[]) => {
      if (err) return next(new Error('DB error'));
      return res.status(200).json(hats);
    });
  }

  public async getSimilarHats(req: Request, res: Response, next: NextFunction) {
    const userId = getUserIdFromRequest(req);
    const hatId = req.params.id;
    const currentHat = await HatsController.findUsersHat(hatId, userId, next);
    if (!currentHat) return next(new NotFound('No hat with given ID.'));

    // const allLostHats = await Post.find({eventType: 'found'}).populate('hat')
  }

  public async deleteUsersHat(req: Request, res: Response, next: NextFunction) {
    const userId = getUserIdFromRequest(req);
    const hatId = req.params.id;
    const hatToDelete = await HatsController.findUsersHat(hatId, userId, next);
    if (!hatToDelete) return next(new NotFound('No hat with given ID.'));

    // TODO: catch
    hatToDelete.remove().then(() => {
      this.#hatsFileManager.deleteFileByName(hatToDelete.fileName);
    });
    return res.status(200).json(hatToDelete);
  }
}
