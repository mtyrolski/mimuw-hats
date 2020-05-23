import {Request} from 'express';
import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import {Profile} from 'passport-google-oauth';

import {Authorizable, User} from '../models/user';
import {
  JWT_SECRET,
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET,
  GOOGLE_OAUTH2_CALLBACK_URL,
} from '../util/secrets';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: GOOGLE_OAUTH2_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifiedCallback
    ) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        // TODO: hardcode auth name constant
        'authMethods.google.id': profile.id,
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const getImageFromProfile = () => {
          if (!profile.photos) return '';
          else return profile.photos[0].value;
        };

        const newUser = await new User({
          // TODO: how to get email? from link URL? (probably)
          // TODO: finding by email - assert uniqueness!!!
          email: 'mock.mimuw.edu.pl',
          authMethods: {
            google: {
              id: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
              pictureUrl: getImageFromProfile(),
            },
          },
        }).save();
        if (newUser) {
          req.user = newUser;
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    },
    async (
      req: Request,
      jwtToken: {data: Authorizable},
      done: VerifiedCallback
    ) => {
      await User.findOne({email: jwtToken.data.email}, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          req.user = user;
          return done(undefined, user, jwtToken);
        } else {
          return done(undefined, false);
        }
      });
    }
  )
);
