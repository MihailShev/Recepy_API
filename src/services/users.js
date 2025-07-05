import { User } from '../db/models/users.js';

export const getUserInfo = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const updateUserInfo = async (payload, userId) => {
  const newUser = await User.findByIdAndUpdate(userId, payload, {new: true});
  return newUser;
};
