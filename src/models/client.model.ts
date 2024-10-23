import mongoose, { Types } from "mongoose";
import mongoService from "../services/mongo.service";
import { IsEmail, IsNotEmpty} from "class-validator";


export class CreateClientValidation {
    @IsEmail({}, {message: "Debes ingresar un email válido"})
    email!: string;
    
    @IsNotEmpty({message: "Debes ingresar un nombre"})
    name!: string
}

export class UpdateClientValidation {
    @IsNotEmpty({message: "Debes ingresar un nombre"})
    name!: string

    @IsEmail({}, {message: "Debes ingresar un email válido"})
    email!: string;
}

  
export interface ClientDoc extends mongoose.Document {
    _id: Types.ObjectId;
    email: string;
    name: string;
    user: {type: mongoose.Types.ObjectId, ref: "User"}
}
class Client {

    schema = mongoService.getMongoose().Schema;

    clientSchema = new this.schema({
        name: String,
        email: String,
        user: {type: mongoose.Types.ObjectId, ref: "User"},
    }, {timestamps: true})

    Client = mongoService.getMongoose().model<ClientDoc, mongoose.PaginateModel<ClientDoc>>('Client', this.clientSchema);

    constructor() {
        console.log("Created client instance")
    }

}

export default new Client()