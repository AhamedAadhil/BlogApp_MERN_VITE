export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const success = false;
  return res.status(statusCode).json({ success, statusCode, message });
};
