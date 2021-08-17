import * as mongoose from 'mongoose';

export const FilmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  country: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
}, { timestamps: true });

FilmSchema.pre('save', function (next) {
  let product = this as any;
  product.slug = product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  next();
});

export interface Film extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  ticketPrice: number;
  rating: number;
  country: string;
  genre: string;
  releaseDate: Date;
}
