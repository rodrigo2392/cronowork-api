import express from 'express';
import { CommonRoutes } from "./common.routes";
import authController from '../controllers/auth.controller';
import { loginValidation } from '../middlewares/user.middleware';

export class AuthRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "AuthRoutes")
    }

    generateRoutes() {
        const router = express.Router();

        router.route("/login").post(
            loginValidation,
            authController.login
        )

        this.app.use("/auth", router)
        return this.app;
    }
}