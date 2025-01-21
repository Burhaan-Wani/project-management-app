import { ErrorRequestHandler, Response } from "express";

interface CustomError extends Error {
  statusCode: number;
  status?: string;
  stack?: string;
  isOperational?: boolean;
}

const sendDevError = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};
const sendProdError = (res: Response, error: CustomError) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.log("ERROR OCCURED", error);
    res.status(error.statusCode).json({
      status: error.status,
      message: "Internal Server Error",
    });
  }
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") sendDevError(res, error);
  else if (process.env.NODE_ENV === "production") sendProdError(res, error);
};
