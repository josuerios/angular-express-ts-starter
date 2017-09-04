import * as httpStatus from "http-status";
import {ExtendableError} from "./ExtendableError";


/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   * @param {number} code - Custom code to sent, check for this field in several places, default to status
   * @param {obj} response - Response data of the request
   *
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, public code = status, public response = undefined) {
    super(message, status, isPublic);

  }
}


module.exports = APIError;
