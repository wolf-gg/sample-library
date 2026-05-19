export class ServerError {
  message: string;
  error: string;
  statusCode: number;

  constructor({
    message,
    error,
    statusCode,
  }: {
    message: string;
    error: string;
    statusCode: number;
  }) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }

  static validate(error: any): error is ServerError {
    return (
      error.message !== undefined &&
      error.error !== undefined &&
      error.statusCode !== undefined
    );
  }
}
