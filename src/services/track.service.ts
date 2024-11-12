import { StartTrackDto, StopTrackDto } from "../dto/track.dto";
import trackModel, { TrackDoc } from "../models/track.model";
import { ObjectId, PaginateOptions, PaginateResult } from "mongoose";
import { ERRORS_M } from "../dto/error.dto";

class ClientService {
  async getCurrent(user: string) {
    const currentProject = await trackModel.Track.findOne({ user, stop: null });
    return currentProject;
  }
  async getAll(
    page: number = 1,
    limit: number = 10,
    user: string
  ): Promise<PaginateResult<TrackDoc>> {
    const options: PaginateOptions = {
      page,
      offset: (page - 1) * limit,
      limit,
      collation: {
        locale: "es",
      },
      populate: [
        {
          path: "project",
          populate: [
            {
              path: "client",
            },
          ],
        },
      ],
    };
    const clients = await trackModel.Track.paginate(
      { user, stop: { $ne: null } },
      options
    );
    return clients;
  }
  async getById(id: string | ObjectId): Promise<TrackDoc> {
    const track = await trackModel.Track.findById(id);
    if (!track) {
      throw ERRORS_M.NOT_FOUND;
    }
    return track;
  }
  async create(body: StartTrackDto): Promise<TrackDoc> {
    const { start, project, description, user } = body;

    const current = await this.getCurrent(user);

    if (current) {
      throw "User already tracking time";
    }

    const client = new trackModel.Track({
      description,
      start,
      project,
      user,
    });
    const newClient = await client.save();

    return newClient;
  }

  async stopTRacking(id: string | null): Promise<TrackDoc | null> {
    if (id === null) {
      return null;
    }
    const stop = Date.now();
    const track = await this.getById(id);
    if (!track) {
      throw ERRORS_M.NOT_FOUND;
    } else {
      await track.updateOne({ stop });
    }
    track.stop = stop;

    return track;
  }

  async update(body: StopTrackDto, id: string): Promise<void> {
    const { stop } = body;
    const track = await this.getById(id);
    if (!track) {
      throw ERRORS_M.NOT_FOUND;
    } else {
      await track.updateOne({ stop });
    }
  }
  async delete(id: string): Promise<void> {
    const track = await this.getById(id);
    if (!track) {
      throw ERRORS_M.NOT_FOUND;
    } else {
      await track.deleteOne();
    }
  }
}

export default new ClientService();
