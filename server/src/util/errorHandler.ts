import {Exception} from '@tsed/exceptions';
import {ErrorRequestHandler} from 'express';

/**
 * A default Ts.ED error handler taken from https://tsed.io/docs/exceptions.html
 * slightly modified to return JSON response by default.
 * @param err - error (potentially Ts.ED Exception instance)
 * @param req
 * @param res
 * @param next
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Exception) {
    if (err.errors) {
      // If errors is provided
      res.set({'x-errors': JSON.stringify(err.errors)});
    }

    if (err.headers) {
      res.set(err.headers);
    }

    if (err.body) {
      // If a body is provided
      return res.status(err.status).json(err.body);
    }

    return res.status(err.status).json({
      error: err.message,
    });
  }

  return next();
};
