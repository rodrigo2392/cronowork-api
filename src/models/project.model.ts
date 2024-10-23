import mongoose, { Types } from "mongoose";
import mongoService from "../services/mongo.service";
import { IsNotEmpty} from "class-validator";


export class CreateProjectValidation {
    @IsNotEmpty({message: "Debes ingresar un nombre"})
    name!: string

    @IsNotEmpty({message: "Debes ingresar un cliente válido"})
    client!: string;
}

export class UpdateProjectValidation {
    @IsNotEmpty({message: "Debes ingresar un nombre"})
    name!: string
}

  
export interface ProjectDoc extends mongoose.Document {
    _id: Types.ObjectId;
    name: string;
    user: {type: mongoose.Types.ObjectId, ref: "User"}
    client: {type: mongoose.Types.ObjectId, ref: "Client"}
}
class Project {

    schema = mongoService.getMongoose().Schema;

    projectSchema = new this.schema({
        name: String,
        user: {type: mongoose.Types.ObjectId, ref: "User"},
        client: {type: mongoose.Types.ObjectId, ref: "Client"}
    }, {timestamps: true})

    Project = mongoService.getMongoose().model<ProjectDoc, mongoose.PaginateModel<ProjectDoc>>('Project', this.projectSchema);

    constructor() {
        console.log("Created project instance")
    }

}

export default new Project()