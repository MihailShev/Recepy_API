
import { Schema, model } from 'mongoose';

const ingredientsSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
});

export const Ingredients = model('ingredients', ingredientsSchema);

