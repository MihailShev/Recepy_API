import { model, Schema } from 'mongoose';

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const Categories = model('categories', categoriesSchema);
