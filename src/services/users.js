import { User } from '../db/models/users.js';

export const getUserInfo = async (userId) => {
  const user = await User.findById(userId);
  return user;
};
