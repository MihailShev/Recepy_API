import mongoose, { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Dessert',
        'Beef',
        'Lamb',
        'Chicken',
        'Seafood',
        'Miscellaneous',
        'Breakfast',
        'Pork',
      ],
      default: null,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    area: {
      type: String,
      required: false,
      default: null,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
      default: null,
    },
    time: {
      type: String,
      required: true,
    },
    cals: {
      type: Number,
      requied: false,
    },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'ingredients',
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Recipes = model('recipes', recipesSchema);
