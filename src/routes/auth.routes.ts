import express from 'express';
import { CommonRoutes } from "./common.routes";
import authController from '../controllers/auth.controller';
import { loginValidation } from '../middlewares/user.middleware';

export class AuthRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "AuthRoutes")
    }

    generateRoutes() {
        this.app.route("/login").post(
            loginValidation,
            authController.login
        )
        return this.app;
    }
}