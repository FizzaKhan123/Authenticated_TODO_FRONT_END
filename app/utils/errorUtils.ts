import { ErrorResponse } from "../Types/type";

export function isErrorResponse(error: unknown): error is ErrorResponse {
    return (error as ErrorResponse).data.message !== undefined;
  }