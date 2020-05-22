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
      this.hatsController.createValidHat
    );

    this.router.post('/mockml', (req, res) => {
      // console.log(req.file.size);
      return res.status(200).json({
        pred: 'nonhat',
      });
    });
  }
}
