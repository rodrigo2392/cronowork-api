import jwt, { Jwt } from "jsonwebtoken";
import userService from "./user.service";
import { compareValues } from "../utils/crypt.util";

interface UserValues {
  id: string;
  name: string;
  email: string;
}
const TOKEN_DURATION = "3 h";
const REFRESH_DURATION = "3 d";
class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    refresh_token: string;
    user: Partial<UserValues>;
  }> {
    const user = await userService.getUserByEmail(email);
    if (user) {
      const result = await compareValues(password, user?.password || "");
      if (result) {
        try {
          const userValues = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const token = await jwt.sign(userValues, process.env.TOKEN_SECRET, {
            expiresIn: TOKEN_DURATION,
          });
          const refresh_token = await jwt.sign(
            userValues,
            process.env.TOKEN_SECRET,
            { expiresIn: REFRESH_DURATION }
          );
          return {
            token,
            refresh_token,
            user: {
              name: userValues.name,
              email: userValues.email,
            },
          };
        } catch (err) {
          console.log({ err });
          throw err;
        }
      } else {
        throw "wrong email/password";
      }
    } else {
      throw "user not found";
    }
  }
  async refresh_token(
    token: string
  ): Promise<{ token: string; refresh_token: string }> {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as Jwt &
        UserValues;

      const userValues = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };

      const newToken = await jwt.sign(userValues, process.env.TOKEN_SECRET, {
        expiresIn: TOKEN_DURATION,
      });
      const refresh_token = await jwt.sign(
        userValues,
        process.env.TOKEN_SECRET,
        { expiresIn: REFRESH_DURATION }
      );
      return {
        token: newToken,
        refresh_token,
      };
    } catch (err) {
      throw "invalid token";
    }
  }
}

export default new AuthService();
