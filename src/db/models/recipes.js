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
        'Seafood',
        'Lamb',
        'Starter',
        'Chicken',
        'Beef',
        'Dessert',
        'Vegan',
        'Pork',
        'Vegetarian',
        'Miscellaneous',
        'Pasta',
        'Breakfast',
        'Side',
        'Goat',
        'Soup',
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
        id: {
          type: String,
          required: true,
          ref: 'ingredient',
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
