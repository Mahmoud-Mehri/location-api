import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

import { User } from "../model/user";
import { successResponse, errorResponse, ErrorCode } from "../utils";
import config from "../config";

export class AuthController {
  constructor() {}

  async loginUser(loginInfo: any) {
    try {
      const user = await User.findOne({
        where: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("email")),
          "=",
          (loginInfo.email as string).toLowerCase()
        ),
      });

      if (user) {
        if (await user.validatePassword(loginInfo.password)) {
          const token = jwt.sign(
            { id: user.id },
            config.http.sign.secretValue,
            { expiresIn: config.http.sign.expireTime }
          );

          const authUser = {
            id: user.id,
            email: user.email,
            token: token,
          };

          return successResponse(authUser);
        }
      }

      return errorResponse(
        ErrorCode.AuthFailed,
        "Email or Password is not correct"
      );
    } catch (err) {
      return errorResponse(ErrorCode.Exception, err.message);
    }
  }
}
