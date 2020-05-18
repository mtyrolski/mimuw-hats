import {Router} from 'express';
import multer from 'multer';
const upload = multer({dest: 'uploads/'});

export class HatsRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/', upload.single('image'), (req, res) => {
      return res.status(200).json(req.body);
    });
  }
}
