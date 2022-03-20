import ApiError from '../exceptions/api-errors';
import { Response, Request, NextFunction } from 'express';

interface ErrorProp extends Error {
  status: number;
  errors: Array<any>;
}

export const errorMiddleware = (
  err: ErrorProp | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).send({ message: err.message, errors: err.errors }).end();
  }
  return res
    .status(500)
    .send({ message: 'Internal Server Error', errors: [err] })
    .end();
};
