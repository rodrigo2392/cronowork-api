import mongoose, { Types } from "mongoose";
import mongoService from "../services/mongo.service";
import { IsEmail, IsNotEmpty} from "class-validator";


export class CreateUserValidation {
    @IsEmail({}, {message: "Debes ingresar un email válido"})
    email!: string;

    @IsNotEmpty({message: "La contraseña no debe estar vacía"})
    password!: string;
    
    @IsNotEmpty({message: "Debes ingresar tu nombre"})
    name!: string
}

export class UpdateUserValidation {
    @IsNotEmpty({message: "Debes ingresar tu nombre"})
    name!: string
}

export class LoginUserValidation {
    @IsEmail({}, {message: "Debes ingresar un email válido"})
    email!: string;

    @IsNotEmpty({message: "La contraseña no debe estar vacía"})
    password!: string;
}


  
export interface UserDoc extends mongoose.Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name: string
}
class User {

    schema = mongoService.getMongoose().Schema;

    userSchema = new this.schema({
        name: String,
        email: String,
        password: String
    }, {timestamps: true})
    User = mongoService.getMongoose().model<UserDoc, mongoose.PaginateModel<UserDoc>>('User', this.userSchema);

    constructor() {
        console.log("Created user instance")
    }

}

export default new User()