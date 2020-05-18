import {Router} from 'express';
import {ProductController} from '../controllers/productController';
import {JWTController} from '../controllers/JWTController';

export class ProductRoutes {
  public router: Router;
  public productController: ProductController = new ProductController();
  public authController: JWTController = new JWTController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get(
      '/',
      this.authController.authenticateJWT,
      this.productController.getProducts
    );
    this.router.get('/:id', this.productController.getProduct);
    this.router.post(
      '/',
      this.authController.authenticateJWT,
      this.productController.createProduct
    );
    this.router.put(
      '/:id',
      this.authController.authenticateJWT,
      this.productController.updateProduct
    );
    this.router.delete(
      '/:id',
      this.authController.authenticateJWT,
      this.productController.deleteProduct
    );
  }
}
