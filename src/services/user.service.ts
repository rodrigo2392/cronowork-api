import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import userModel, { UserDoc } from "../models/user.model";
import { PaginateOptions, PaginateResult } from "mongoose";
import { hashValue } from "../utils/crypt.util";
import {ERRORS_M} from '../dto/error.dto'


class UserService {
    
    async getAll(page: number = 1, limit: number = 10): Promise<PaginateResult<UserDoc>> {
        const options: PaginateOptions = {
            page,
            offset: (page - 1) * limit,
            limit,
            collation: {
              locale: 'es',
            },
        };
        const users = await userModel.User.paginate({}, options);
        return users;
    }
    async getById(id: string): Promise<UserDoc> {
        const user = await userModel.User.findById(id);
        if(!user) {
            throw ERRORS_M.NOT_FOUND;
        }
        return user;
    }
    async create(body: CreateUserDto): Promise<UserDoc> {
        const {name, email, password} = body;

        const exists = await this.getUserByEmail(email)

        if(exists) {
            throw ERRORS_M.ALREADY_EXISTS;
        }

        const hashedPassword =  await hashValue(password)

        const user = new userModel.User({
            name, email, password: hashedPassword
        })
        const newUser = await user.save();

        return newUser;
    }
    async update(body: UpdateUserDto, id: string): Promise<void> {
        const {name} = body;
        const user = await this.getById(id)
        if(!user) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await user.updateOne({name})
        }
    }
    async delete(id: string): Promise<void> {
        const user = await this.getById(id)
        if(!user) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await user.deleteOne()
        }
    }

    async getUserByEmail(email: string): Promise<UserDoc | null> {
        const user = await userModel.User.findOne({email})
        return user;
    }

}

export default new UserService();