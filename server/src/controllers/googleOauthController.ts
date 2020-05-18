import passport from 'passport';
import '../auth/passportHandler';

export class GoogleOauthController {
  public static authName = 'google';

  public static loginRegisterMiddleware() {
    return passport.authenticate(GoogleOauthController.authName, {
      session: false,
      scope: ['https://www.googleapis.com/auth/plus.login'],
    });
  }

  public static authMiddleware() {
    return passport.authenticate(GoogleOauthController.authName, {
      session: false,
      // TODO: Remove hardcoded route!
      failureRedirect: '/login',
    });
  }
}
