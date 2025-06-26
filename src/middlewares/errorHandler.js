export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err);

  res.status(status).json({
    status,
    message: 'Something went wrong',
    data: err.message,
  });
};
