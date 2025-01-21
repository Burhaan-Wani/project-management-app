import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";

interface CustomError extends Error {
  statusCode: number;
  status?: string;
  stack?: string;
  errorCode?: string;
  isOperational?: boolean;
}

const sendDevError = (res: Response, error: CustomError) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    errorCode: error.errorCode,
    message: error.message,
    stack: error.stack,
  });
};
const sendProdError = (res: Response, error: CustomError) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      errorCode: error.errorCode,
      message: error.message,
    });
  } else {
    console.log("ERROR OCCURED", error);
    res.status(error.statusCode).json({
      status: error.status,
      errorCode: error.errorCode,
      message: "Internal Server Error",
    });
  }
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") sendDevError(res, error);
  else if (process.env.NODE_ENV === "production") sendProdError(res, error);
};
