import express from 'express';
import { CommonRoutes } from "./common.routes";
import userController from '../controllers/user.controller';
import { createUserValidation, updateValidation } from '../middlewares/user.middleware';

export class UserRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "UserRoutes")
    }

    generateRoutes() {
        this.app.route("/users").get(userController.getAll)
        this.app.route("/users/:id").get(userController.getById)
        this.app.route("/users").post(
            createUserValidation,
            userController.create
        )
        this.app.route("/users/:id").delete(userController.delete)
        this.app.route("/users/:id").patch(
            updateValidation,
            userController.update
        )
        return this.app;
    }
}