'use strict';

import {Request, Response, NextFunction} from "express";
import {APIError} from "./APIError";
import {InternalServerError} from "./InternalServerError";
const env = process.env.NODE_ENV;

/**
 * Try to convert all errors in the pipe to a common
 * interface aiming for better manipulation
 * If error is not an instanceOf HttpError, convert it.
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function errorConverter(err: any, req: Request, res: Response, next: NextFunction) {

  //Check for axios error since it swallows the real error code and information
  //of the request error
  if (err.config && err.response) {
    //TODO: move this creation logic inside class
    const status = err.response.status;
    const message = `Error request to ${ err.config.url} from ${req.hostname}${req.originalUrl}`;
    const code = err.response.data && err.response.data.code || err.code;
    const isPublic = env !== 'production';
    const error = new APIError(message, status, isPublic, code, err.response.data);
    return next(error);
  } else {
    // Not an axios error? most likely to be a developer error
    // throw it out as a InternalServerError, as fast as you can...
    const serverError = new InternalServerError(err);
    return next(serverError);
  }
}


