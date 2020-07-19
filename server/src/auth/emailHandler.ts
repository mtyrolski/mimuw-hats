import * as jwt from 'jsonwebtoken';
import validator from 'email-validator';
import {JWT_SECRET} from '../util/secrets';

const MIMUW_EMAIL_REGEXP = /^[a-z\d]+@[a-z]+\.(?:[a-z]+\.)?mimuw\.edu\.pl.*$/ as RegExp;

export const isCorrectMimuwEmail = (email: string) => {
  return validator.validate(email) && email.match(MIMUW_EMAIL_REGEXP);
};

export interface EmailPayload {
  email: string;
}

export class EmailToken {
  #payload: EmailPayload;
  #tokenStr: string;

  constructor(payload: EmailPayload) {
    this.#payload = payload;
    this.#tokenStr = jwt.sign(payload, JWT_SECRET);
  }

  public static decode(tokenStr: string): EmailToken {
    const decodedPayload = jwt.verify(tokenStr, JWT_SECRET) as EmailPayload;
    return new EmailToken(decodedPayload);
  }

  get email() {
    return this.#payload.email;
  }

  get token() {
    return this.#tokenStr;
  }
}
