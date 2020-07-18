import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
require('dotenv').config();

import {MONGODB_URI} from './util/secrets';

import {errorHandler} from './util/errorHandler';
import {ProductRoutes} from './routes/productRoutes';
import {UserRoutes} from './routes/userRoutes';
import {HatsRoutes} from './routes/hatsRoutes';
import {PostsRoutes} from './routes/postsRoutes';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.logger();
    this.config();
    this.routes();
    this.static();
    this.errorHandler();
    this.mongo();
    this.swagger();
  }

  public routes(): void {
    this.app.use('/api/user', new UserRoutes().router);
    this.app.use('/api/products', new ProductRoutes().router);
    this.app.use('/api/hats', new HatsRoutes().router);
    this.app.use('/api/posts', new PostsRoutes().router);
  }

  public static() {
    this.app.use(
      process.env.HATS_STORAGE_ENDPOINT as string,
      express.static(process.env.HATS_STORAGE_DIR as string)
    );
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(compression());

    this.app.use(cookieParser());
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(
      cors({
        // // TODO: set to frontend and local in debug
        origin: process.env.CLIENT_HOME_PAGE_URL, // allow to server to accept request from different origin
        credentials: true, // allow session cookie from browser to pass through
      })
    );
  }

  private mongo() {
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongo Connection Established');
    });
    connection.on('reconnected', () => {
      console.log('Mongo Connection Reestablished');
    });
    connection.on('disconnected', () => {
      console.log('Mongo Connection Disconnected');
      console.log('Trying to reconnect to Mongo ...');
      setTimeout(() => {
        mongoose.connect(MONGODB_URI, {
          autoReconnect: true,
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
        });
      }, 3000);
    });
    connection.on('close', () => {
      console.log('Mongo Connection Closed');
    });
    connection.on('error', (error: Error) => {
      console.log('Mongo Connection ERROR: ' + error);
    });

    const run = async () => {
      await mongoose.connect(MONGODB_URI, {
        autoReconnect: true,
        keepAlive: true,
      });
    };
    run().catch(error => console.error(error));
  }

  public swagger() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const swaggerDocument = require('../swagger.json');
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public logger() {
    this.app.use(morgan('dev'));
  }

  public errorHandler() {
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        '  API is running at http://localhost:%d',
        this.app.get('port')
      );
    });
  }
}

const server = new Server();

server.start();
