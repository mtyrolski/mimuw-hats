import {Router} from 'express';
import multer from 'multer';
import {HatsController} from '../controllers/hatsController';

const upload = multer({
  storage: multer.memoryStorage(),
});

export class HatsRoutes {
  router: Router;
  public hatsController: HatsController = new HatsController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post(
      '/',
      upload.single('image'),
      this.hatsController.verifyHatImage,
      this.hatsController.saveHat.bind(this.hatsController)
    );

    this.router.get(
      '/',
      this.hatsController.getUsersHats.bind(this.hatsController)
    );

    this.router.get(
      '/:id/similar',
      this.hatsController.getSimilarHats.bind(this.hatsController)
    );

    this.router.delete(
      '/:id',
      this.hatsController.deleteUsersHat.bind(this.hatsController)
    );
  }
}
