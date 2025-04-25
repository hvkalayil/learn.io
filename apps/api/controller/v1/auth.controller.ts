import { Context } from "@oak/oak";
import { AuthService } from "../../service/auth.service.ts";
import { sendErrorResponse, sendResponse } from "../../utils/response.ts";

export const authController = {
  login: async (context: Context) => {
    try {
      const { email, password } = await context.request.body.json();

      if (!email || !password) {
        sendResponse(
          context,
          400,
          "Input Error: Please enter email and password",
        );
        return;
      }

      const result = await AuthService.loginUser(email, password);
      if (result) {
        context.response.status = 200;
        context.response.body = result;
        return;
      }
      sendResponse(context, 401, "Runtime Error: Login failed");
    } catch (error) {
      sendErrorResponse(context, error);
    }
  },
  refresh: async (context: Context) => {
    try {
      const { refreshToken } = await context.request.body.json();
      const result = await AuthService.refreshAuthTokens(refreshToken);
      if (result) {
        context.response.status = 200;
        context.response.body = result;
        return;
      }
      sendResponse(context, 401, "Error: Token Refresh failed");
    } catch (error) {
      sendErrorResponse(context, error);
    }
  },
};
