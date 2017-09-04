/**
 * Created by Josue on 12/7/17.
 */
import {ExtendableError} from "./ExtendableError";
import * as httpStatus from "http-status";
/**
 * Class representing an Internal Server error. commonly a developer error, or an unmanaged one
 * @extends ExtendableError
 */
export class InternalServerError extends ExtendableError {
  constructor(error) {
    super(error.message, httpStatus.INTERNAL_SERVER_ERROR, true);
    //get stack of original Error
    this.stack = error.stack;
  }
}

