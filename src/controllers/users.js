import { getUserInfo } from '../services/users.js';

export const getUserController = async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await getUserInfo(userId);
  
  res.status(200).json({
    status: 200,
    message: 'Successfully found info about current user',
    data: user,
  });
};
