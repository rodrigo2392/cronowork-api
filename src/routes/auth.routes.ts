import express from 'express';
import { CommonRoutes } from "./common.routes";
import authController from '../controllers/auth.controller';
import { loginValidation, createUserValidation } from '../middlewares/user.middleware';

export default class AuthRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "AuthRoutes")
    }

    generateRoutes() {
        const router = express.Router();

        router.route("/login").post(
            loginValidation,
            authController.login
        )

        router.route("/register").post(
            createUserValidation,
            authController.register
        )

        this.app.use("/auth", router)
        return this.app;
    }
}