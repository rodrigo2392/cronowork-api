import express from "express";
import trackService from "../services/track.service";
import { ERRORS_M, RESPONSE_M } from "../dto/error.dto";
import { StartTrackDto } from "../dto/track.dto";
import io from "socket.io";

export interface Query {
  page: number;
  limit: number;
}

class UserController {
  async getAll(req: express.Request, res: express.Response) {
    try {
      const { user } = req.headers;
      const { page, limit } = req.query;
      const tracks = await trackService.getAll(
        parseInt((page as string) || ""),
        parseInt((limit as string) || ""),
        user as string
      );
      res.json(tracks);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async getCurrentTrack(req: express.Request, res: express.Response) {
    try {
      const { user } = req.headers;
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }
      const currentTrack = await trackService.getCurrent(user as string);
      res.json({ project: currentTrack });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async startTracking(req: express.Request, res: express.Response) {
    try {
      const { user } = req.headers;
      const { description, project } = req.body;

      const startDate = Date.now();

      const body: StartTrackDto = {
        user: user as string,
        description,
        project,
        start: startDate,
      };

      const newTrack = await trackService.create(body);

      res.json({ project: newTrack });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async stopTracking(req: express.Request, res: express.Response) {
    try {
      const { user } = req.headers;
      const track = await trackService.getCurrent(user as string);

      if (!track) {
        throw "User is not tracking";
      }
      const stoppedTrack = await trackService.stopTRacking(
        track?._id.toString() || null
      );
      res.json({ project: stoppedTrack });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      await trackService.delete(id);
      res.json({ message: RESPONSE_M.OK });
    } catch (err) {
      res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({ message: err });
    }
  }
}

export default new UserController();
