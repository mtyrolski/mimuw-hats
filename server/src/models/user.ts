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
  id: {type: String, unique: true},
  accessToken: String,
  refreshToken: String,
  pictureUrl: String,
});

export const userSchema: Schema = new Schema({
  email: {type: String, unique: true},
  authMethods: {
    type: Map,
    of: authMethodSchema,
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    ret.pictureUrl = ret.authMethods['google'].pictureUrl;
    delete ret.authMethods;
  },
});

export const User: Model<Authorizable> = model<Authorizable>(
  'User',
  userSchema
);
