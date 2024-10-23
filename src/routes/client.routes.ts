import express from 'express';
import { CommonRoutes } from "./common.routes";
import clientController from '../controllers/client.controller';
import { createClientValidation, updateValidation } from '../middlewares/client.middleware';
import { validateToken } from '../middlewares/auth.middleware';

export default class ClientRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "ClientRoutes")
    }

    generateRoutes() {
        const router = express.Router();


        router.route("/").get(validateToken, clientController.getAll)
        router.route("/:id").get(validateToken, clientController.getById)
        router.route("/").post(
            validateToken,
            createClientValidation,
            clientController.create
        )
        router.route("/:id").delete(validateToken,clientController.delete)
        router.route("/:id").patch(
            validateToken,
            updateValidation,
            clientController.update
        )
        this.app.use("/clients", router)
        return this.app;
    }
}