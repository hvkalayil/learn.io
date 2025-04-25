import { Context } from "@oak/oak";

export const sendErrorResponse = (context: Context, error: unknown) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  context.response.status = 500;
  if (error instanceof Error && error.message) {
    errorMessage = error.message;
  }
  context.response.body = { message: errorMessage, error };
};

export const sendResponse = (
  context: Context,
  code: number,
  message: string,
) => {
  context.response.status = code;
  context.response.body = { message };
};
