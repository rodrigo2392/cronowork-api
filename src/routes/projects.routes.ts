import express from 'express';
import { CommonRoutes } from "./common.routes";
import projectController from '../controllers/project.controller';
import { createProjectValidation, updateValidation } from '../middlewares/project.middleware';
import { validateToken } from '../middlewares/auth.middleware';

export default class ClientRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "ClientRoutes")
    }

    generateRoutes() {
        const router = express.Router();


        router.route("/").get(validateToken, projectController.getAll)
        router.route("/:id").get(validateToken, projectController.getById)
        router.route("/").post(
            validateToken,
            createProjectValidation,
            projectController.create
        )
        router.route("/:id").delete(validateToken,projectController.delete)
        router.route("/:id").patch(
            validateToken,
            updateValidation,
            projectController.update
        )
        this.app.use("/projects", router)
        return this.app;
    }
}