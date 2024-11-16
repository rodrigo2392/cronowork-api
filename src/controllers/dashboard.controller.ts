import express from "express";
import dashboardService from "../services/dashboard.service";

class DashboardController {
  async getData(req: express.Request, res: express.Response) {
    try {
      const { user } = req.headers;
      const data = await dashboardService.getData(user as string);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

export default new DashboardController();
