import express from "express";
import { CommonRoutes } from "./common.routes";
import trackController from "../controllers/track.controller";
import { validateToken } from "../middlewares/auth.middleware";

export default class TrackRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, "TrackRoutes");
  }

  generateRoutes() {
    const router = express.Router();

    router
      .route("/current")
      .get(validateToken, trackController.getCurrentTrack);
    router.route("/").get(validateToken, trackController.getAll);
    router.route("/start").post(validateToken, trackController.startTracking);
    router.route("/stop").post(validateToken, trackController.stopTracking);
    router.route("/:id").delete(validateToken, trackController.delete);
    this.app.use("/track", router);
    return this.app;
  }
}
