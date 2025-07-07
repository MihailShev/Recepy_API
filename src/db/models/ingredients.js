import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const Ingredients = model('ingredient', ingredientSchema);
