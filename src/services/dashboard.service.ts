import clientModel from "../models/client.model";
import projectModel from "../models/project.model";
import trackModel from "../models/track.model";

interface Result {
  clients: number;
  projects: number;
  hours: number;
}

class ClientService {
  async getData(user: string): Promise<Result> {
    const clients = await clientModel.Client.countDocuments({ user });
    const projects = await projectModel.Project.countDocuments({ user });
    const hours = await trackModel.Track.countDocuments({ user });
    return {
      clients,
      projects,
      hours,
    };
  }
}

export default new ClientService();
