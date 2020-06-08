import {NextFunction, Request, Response} from 'express';
import {HatEvent, Post} from '../models/post';
import {InternalServerError, UnprocessableEntity} from '@tsed/exceptions';
import {getUserIdFromRequest} from './userController';

export class PostsController {
  public async createPost(req: Request, res: Response, next: NextFunction) {
    const createdPost = new Post(req.body);
    createdPost.poster = getUserIdFromRequest(req);
    await createdPost.save((err, product) => {
      if (err) return next(new UnprocessableEntity(err));
      return res.json(product.toJSON());
    });
  }

  public async getPosts(req: Request, res: Response, next: NextFunction) {
    const page = Number(req.query?.page);
    const perPage = Number(req.query?.perPage);
    let baseQuery = Post.find().sort({date: -1});

    if (typeof page !== undefined && perPage) {
      const offset = page * perPage;
      baseQuery = baseQuery.skip(offset).limit(perPage);
    }

    await baseQuery
      .populate('poster')
      .populate('hat')
      .exec((err, posts) => {
        if (err) return next(new InternalServerError('DB error'));
        return res.json(posts);
      });
  }

  public async deletePost(req: Request, res: Response, next: NextFunction) {
    const hatId = req.params.id;
    await Post.findByIdAndDelete(hatId);
    return res.status(200).json({
      message: 'success',
    });
  }
}
