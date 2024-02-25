import { Router } from "express";
import { AuthController } from "../../../controller/auth-controller";
import { removeErrorCode } from "../../../utils";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post("/login", async (req, res) => {
  const loginInfo = req.body;
  authController.loginUser(loginInfo).then((result) => {
    res.status(result.errorCode).json(removeErrorCode(result));
  });
});
