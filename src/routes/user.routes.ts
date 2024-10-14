import express from 'express';
import { CommonRoutes } from "./common.routes";
import userController from '../controllers/user.controller';
import { createUserValidation, updateValidation } from '../middlewares/user.middleware';
import { validateToken } from '../middlewares/auth.middleware';

export class UserRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "UserRoutes")
    }

    generateRoutes() {
        this.app.route("/users").get(validateToken, userController.getAll)
        this.app.route("/users/:id").get(validateToken, userController.getById)
        this.app.route("/users").post(
            validateToken,
            createUserValidation,
            userController.create
        )
        this.app.route("/users/:id").delete(validateToken,userController.delete)
        this.app.route("/users/:id").patch(
            validateToken,
            updateValidation,
            userController.update
        )
        return this.app;
    }
}