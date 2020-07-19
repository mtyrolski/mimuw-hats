import {Document, Schema, Model, model} from 'mongoose';

export interface LosableItem extends Document {
  owner: string;
  name: string;
  fileName: string;
  imageUrl: string;
}

export const hatSchema: Schema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: String,
    fileName: {type: String, unique: true, required: true},
    imageUrl: String,
  },
  {
    toJSON: {virtuals: true},
  }
);

hatSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.fileName;
  },
});
// hatSchema.virtual('id', {
//   ref: 'Hat',
//   localField: '_id',
//   foreignField: 'id',
// });

export const Hat: Model<LosableItem> = model<LosableItem>('Hat', hatSchema);
