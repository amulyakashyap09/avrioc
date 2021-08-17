import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  filmId: {
    type: mongoose.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, { timestamps: true });

export interface Comment extends mongoose.Document {
  userId: mongoose.ObjectId;
  comment: string;
}
