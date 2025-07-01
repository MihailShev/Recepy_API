import { getUserInfo, updateUserInfo } from '../services/users.js';

export const getUserController = async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await getUserInfo(userId);
  
  res.status(200).json({
    status: 200,
    message: 'Successfully found info about current user',
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const { id: userId } = req.user;
  
  const result = await updateUserInfo(req.body, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully update contact info current user!',
    data: result,
  });
};
