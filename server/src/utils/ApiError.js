// Custom error with a status code. Throw these from controllers/services.
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}