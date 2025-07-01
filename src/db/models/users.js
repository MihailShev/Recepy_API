import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: { type: String, required: true },
    favorites: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
      default: [],
    },

    ownRecipes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);
