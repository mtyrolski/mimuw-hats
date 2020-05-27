import {NextFunction, Request, Response} from 'express';
import {
  BadRequest,
  Conflict,
  GatewayTimeout,
  Unauthorized,
  UnprocessableEntity,
} from '@tsed/exceptions';
import * as jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

import '../auth/passportHandler';
import {
  JWT_SECRET,
  JWT_EXPIRATION_SECS,
  CLIENT_HOME_PAGE_URL,
  SENDGRID_API_KEY,
} from '../util/secrets';
import {Authorizable, User} from '../models/user';
import {
  EmailPayload,
  EmailToken,
  isCorrectMimuwEmail,
} from '../auth/emailHandler';

export const getUserIdFromRequest = (req: Request) =>
  req.user ? req.user._id : '5ec2a82761d31b7dda7910c7';

export class UserController {
  public afterExternalAuth(req: Request, res: Response) {
    const token = jwt.sign(
      {
        data: req.user,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRATION_SECS}
    );
    res.cookie('jwt', token, {
      maxAge: (1 + JWT_EXPIRATION_SECS) * 1000,
    });
    // TODO: redirect needed? I don't think so.
    res.status(200).redirect(CLIENT_HOME_PAGE_URL);
  }

  public getUser(req: Request, res: Response) {
    const user = req.user as Authorizable;
    return res.status(200).json({
      email: user.email,
      pictureUrl: user.authMethods.get('google')!.pictureUrl,
    });
  }

  public async registerEmail(req: Request, res: Response, next: NextFunction) {
    // TODO: think about better schema verification - automatic typescript interface + err handler?
    // TODO: check if user not already registered
    if (!('email' in req.body))
      return next(new BadRequest('No email provided.'));
    const payload = req.body as EmailPayload;

    if (!isCorrectMimuwEmail(payload.email))
      return next(new UnprocessableEntity('Not a MIMUW email.'));

    const alreadyExists = await User.exists({email: payload.email});
    if (alreadyExists) return next(new Conflict('User already exists'));

    const tokenWrapper = new EmailToken(payload);
    // TODO: remove mock email
    const mockEmail = 'st406386@students.mimuw.edu.pl';

    // TODO: generate URL for route
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: mockEmail,
      from: 'kkrecikov@yandex.com',
      subject: 'Mimuw-hats: continue your registration',
      text:
        'Here is your activation link: http://localhost:4000/api/user/google/register/' +
        tokenWrapper.token,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      return next(new GatewayTimeout(error.response.body));
    }

    return res.status(200).json({
      token: tokenWrapper.token,
    });
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    const token = req.params.token as string;
    try {
      const tokenWrapper = EmailToken.decode(token);
      req.params.email = tokenWrapper.email;
    } catch (err) {
      return next(new Unauthorized('Invalid token'));
    }
    // TODO: check if email not already registered
    return next();
  }
}
