import express from "express";
import { CommonRoutes } from "./common.routes";
import dashboardController from "../controllers/dashboard.controller";
import { validateToken } from "../middlewares/auth.middleware";

export default class TrackRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, "TrackRoutes");
  }

  generateRoutes() {
    const router = express.Router();
    router.route("/").get(validateToken, dashboardController.getData);
    this.app.use("/dashboard", router);
    return this.app;
  }
}
