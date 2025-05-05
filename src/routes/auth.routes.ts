import express from 'express';
import { CommonRoutes } from "./common.routes";
import authController from '../controllers/auth.controller';
import { loginValidation, createUserValidation } from '../middlewares/user.middleware';

export default class AuthRoutes extends CommonRoutes {
    constructor(app: express.Application) {
        super(app, "AuthRoutes")
    }

    generateRoutes() {
        const router = express.Router();

        /**
         * @openapi
         * /login:
         *   post:
         *     summary: Iniciar sesión con email y contraseña
         *     tags:
         *       - Auth
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 format: email
         *                 example: user@example.com
         *               password:
         *                 type: string
         *                 example: supersecret123
         *     responses:
         *       200:
         *         description: Autenticación exitosa
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 token:
         *                   type: string
         *                 refresh_token:
         *                   type: string
         *                 user:
         *                   type: object
         *                   properties:
         *                     name:
         *                       type: string
         *                     email:
         *                       type: string
         *       400:
         *         description: Credenciales incorrectas o usuario no encontrado
         */

        router.route("/login").post(
            loginValidation,
            authController.login
        )

        router.route("/register").post(
            createUserValidation,
            authController.register
        )

        router.route("/refresh_token").post(
            authController.refresh_token
        )

        this.app.use("/auth", router)
        return this.app;
    }
}