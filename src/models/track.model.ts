import mongoose, { Types } from "mongoose";
import mongoService from "../services/mongo.service";
import { IsNotEmpty } from "class-validator";

export class StartTrackValidation {
  @IsNotEmpty({ message: "Debes ingresar un inicio" })
  start!: string;

  @IsNotEmpty({ message: "Debes ingresar una descripción" })
  description!: string;

  @IsNotEmpty({ message: "Debes seleccionar un projecto" })
  project!: string;
}

export class StopTrackValidation {
  @IsNotEmpty({ message: "Debes indicar un id" })
  id!: string;

  @IsNotEmpty({ message: "Debes ingresar un fin" })
  stop!: string;
}

export interface TrackDoc extends mongoose.Document {
  _id: Types.ObjectId;
  start: number;
  stop: number | null;
  description: string;
  project: { type: mongoose.Types.ObjectId; ref: "Project" };
  user: { type: mongoose.Types.ObjectId; ref: "User" };
}
class Track {
  schema = mongoService.getMongoose().Schema;

  clientSchema = new this.schema(
    {
      start: Number,
      stop: { type: Number, default: null },
      description: String,
      project: { type: mongoose.Types.ObjectId, ref: "Project" },
      user: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  );

  Track = mongoService
    .getMongoose()
    .model<TrackDoc, mongoose.PaginateModel<TrackDoc>>(
      "Track",
      this.clientSchema
    );

  constructor() {
    console.log("Created Track instance");
  }
}

export default new Track();
