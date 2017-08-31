/*************************
 * Application middleware that sets a 404 status
 * Used to later process a not founded request
 ************************/
import * as httpStatus from "http-status";
import {Request, Response, NextFunction} from "express";

export function fourOFour(req: Request, res: Response, next: NextFunction) {
  // Checks if headers are already sent
  if (res.headersSent) {
    return next();
  }
  res.status(httpStatus.NOT_FOUND);
  return next();
}


