import { model, Schema } from 'mongoose';

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Categories = model('categories', categoriesSchema);
