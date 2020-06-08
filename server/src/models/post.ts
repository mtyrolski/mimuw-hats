import {Document, Schema, Model, model} from 'mongoose';

export interface HatEvent extends Document {
  eventType: string;
  poster: string;
  textContent: string;
  date: Date;
  hat: string;
}

export const postSchema: Schema = new Schema({
  eventType: {
    type: String,
    enum: ['lost', 'found'],
    required: true,
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  textContent: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  hat: {
    type: Schema.Types.ObjectId,
    ref: 'Hat',
  },
});

postSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

export const Post: Model<HatEvent> = model<HatEvent>('Post', postSchema);
