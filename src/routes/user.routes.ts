import express from 'express';
import { CommonRoutes } from "./common.routes";
import userModel from '../models/user.model';

export class UserRoutes extends CommonRoutes{
    constructor(app: express.Application) {
        super(app, "UserRoutes")
    }

    generateRoutes() {
        this.app.route("/users").get(async (req, res) => {
            const users = await userModel.User.find({});
            res.json({data: users})
        })

        this.app.route("/users").post(async (req, res) => {
            console.log({body: req.body})
            /*const users = await userModel.User.create({

            })*/
            res.json({data: req.body})
        })

        return this.app;
    }
}