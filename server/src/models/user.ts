import {Document, Schema, Model, model} from 'mongoose';

export interface AuthMethod {
  id: string;
  pictureUrl: string;
}

export interface OAuth2Method extends AuthMethod {
  accessToken: string;
  refreshToken: string;
}

export interface Authorizable extends Document {
  email: string;
  authMethods: Map<string, AuthMethod>;
}

export const authMethodSchema: Schema = new Schema({
  id: String,
  accessToken: String,
  refreshToken: String,
  pictureUrl: String,
});

export const userSchema: Schema = new Schema({
  email: String,
  authMethods: {
    type: Map,
    of: authMethodSchema,
  },
});

export const User: Model<Authorizable> = model<Authorizable>(
  'User',
  userSchema
);
