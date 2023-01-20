export interface IError extends Error {
  statusCode: number;
}

export class CustomError extends Error {
  statusCode = 400;
  message = "Algo salió mal.";

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
