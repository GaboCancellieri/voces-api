import { Request, Response, NextFunction } from "express";

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.statusCode || 400;
  const errMsg = err.message || "Algo salió mal";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    // stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
