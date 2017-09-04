/**
 * Created by Josue on 12/7/17.
 */

/**
 * @extends Error
 */
export class ExtendableError extends Error {
  constructor(message: string, public status: any, public isPublic: boolean) {
    super(message);
    this.message = message;
  }
}

