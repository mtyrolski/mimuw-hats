import { Document, Schema, Model, model, Error } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema = new Schema({
  username: String,
  password: String,
});


userSchema.pre<IUser>("save", function save(next) {
  const user = this;

  next();
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  // bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
  //   callback(err, isMatch);
  // });
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
