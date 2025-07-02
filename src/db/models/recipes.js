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
    cals: {
      type: Number,
      requied: false,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [
        {
          id: {
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
      default: []
    },
  },
  {
    timestamps: true,
  },
);

export const Recipes = model('recipes', recipesSchema);
