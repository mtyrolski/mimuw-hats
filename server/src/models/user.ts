import {Document, Schema, Model, model, Error} from 'mongoose';

export interface Authorizable extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema = new Schema({
  username: String,
  password: String,
});

userSchema.pre<Authorizable>('save', next => {
  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  // bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
  //   callback(err, isMatch);
  // });
  callback();
};

export const User: Model<Authorizable> = model<Authorizable>(
  'User',
  userSchema
);
