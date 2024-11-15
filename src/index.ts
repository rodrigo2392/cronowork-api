import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyparser from "body-parser";
import { rateLimit } from "express-rate-limit";
dotenv.config();
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import ClientRoutes from "./routes/client.routes";
import ProjectRoutes from "./routes/projects.routes";
import TrackRoutes from "./routes/track.routes";
import { CommonRoutes } from "./routes/common.routes";
import { errorHandler } from "./middlewares/error.middleware";
import mongoService from "./services/mongo.service";
import http from "http";
import SocketService from "./services/socket.service";

const app = express();

const server = http.createServer(app);

new SocketService(server);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.set("trust proxy", 1);
// app.use(limiter);

app.use(cors());
app.use(bodyparser.json());

const port = process.env.PORT;
const routes: Array<CommonRoutes> = [];

routes.push(new UserRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new ClientRoutes(app));
routes.push(new ProjectRoutes(app));
routes.push(new TrackRoutes(app));

app.get("/", (req, res) => {
  res.json({ message: "API CRONOWORK V1" });
});
app.get("/healthcheck", async (_req, res, _next) => {
  try {
    const mongoose = mongoService.getMongoose();
    const healthcheck = {
      uptime: process.uptime(),
      status: "OK",
      timestamp: Date.now(),
      mongo: mongoose.connection.readyState === 1 ? "OK" : "unknow",
    };
    res.status(200).json(healthcheck);
  } catch (err) {
    res.status(503).json({ err });
  }
});

app.use(errorHandler);

server.listen(port, () => {
  routes.map((el) => {
    console.log(`Route ${el.getName()}`);
  });
  console.log(`listening on *:${port}`);
});
