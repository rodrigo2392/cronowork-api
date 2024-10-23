import express from 'express';
import { CommonRoutes } from "./common.routes";
import userController from '../controllers/user.controller';
import { createUserValidation, updateValidation } from '../middlewares/user.middleware';
import { validateToken } from '../middlewares/auth.middleware';

export default class UserRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "UserRoutes")
    }

    generateRoutes() {
        const router = express.Router();


        router.route("/").get(validateToken, userController.getAll)
        router.route("/:id").get(validateToken, userController.getById)
        router.route("/").post(
            validateToken,
            createUserValidation,
            userController.create
        )
        router.route("/:id").delete(validateToken,userController.delete)
        router.route("/:id").patch(
            validateToken,
            updateValidation,
            userController.update
        )
        this.app.use("/users", router)
        return this.app;
    }
}