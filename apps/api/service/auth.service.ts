import { API_KEY } from "../config.ts";
import { User } from "../database/model/user.ts";
import { DbService } from "./db.service.ts";
import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import {
  create,
  getNumericDate,
  Header,
  verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";
export interface TokenPayload {
  id: string;
  email: string;
  type: "admin" | "learner" | "teacher";
  iss: string;
}
function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "id" in payload &&
    "email" in payload
  );
}
export class AuthService {
  static async loginUser(email: string, password: string) {
    try {
      const currentUser = await this.#checkIfNewUser(email);
      if (!currentUser.exist) {
        currentUser.user = await this.#createNewUser(email, password);
      }
      const isMatching = await compare(password, currentUser.user.password);
      if (!isMatching) {
        throw new Error("Wrong Password");
      }
      return this.#generateTokens(currentUser.user);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async refreshAuthTokens(token: string) {
    try {
      const payload = await this.verifyToken(token);
      if (payload) {
        return this.#generateTokens(payload);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async verifyToken(token: string): Promise<TokenPayload | null> {
    const cryptoKey = await this.#getCryptoKey();
    const payload = await verify(token, cryptoKey);
    if (isTokenPayload(payload)) {
      return payload;
    }
    return null;
  }
  static async #checkIfNewUser(
    email: string,
  ): Promise<{ exist: boolean; user: User }> {
    try {
      // PocketBase: filter users collection by email
      const user = await DbService.getFirstMatch<User>(
        "learnio_users",
        `email = "${email}"`,
      );
      return { exist: true, user };
    } catch {
      // getFirstListItem throws a 404-like error when no record is found
      return { exist: false, user: {} as User };
    }
  }
  static async #createNewUser(email: string, password: string): Promise<User> {
    const hashedPassword = await hash(password);
    // PocketBase: create a record in the users collection
    return await DbService.create<User>("learnio_users", {
      email,
      password: hashedPassword,
      type: "learner",
    });
  }
  static async #generateTokens(
    user: { id: string; email: string; type: "admin" | "learner" | "teacher" },
  ) {
    const cryptoKey = await this.#getCryptoKey();
    const header: Header = {
      alg: "HS256",
      typ: "JWT",
    };
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      type: user.type,
      iss: "Learn.io API",
    };
    const accessToken = await create(header, {
      ...payload,
      exp: getNumericDate(60 * 60),
    }, cryptoKey);
    const refreshToken = await create(header, {
      ...payload,
      exp: getNumericDate(60 * 60 * 24 * 7),
    }, cryptoKey);
    return { accessToken, refreshToken };
  }
  static async #getCryptoKey() {
    const keyBuff = new TextEncoder().encode(API_KEY);
    return await crypto.subtle.importKey(
      "raw",
      keyBuff,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );
  }
}
