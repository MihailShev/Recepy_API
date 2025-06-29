import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
});

export const Ingredient = model('ingredients', ingredientSchema);
