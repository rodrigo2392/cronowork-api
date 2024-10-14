import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import userModel, { UserDoc } from "../models/user.model";
import { PaginateOptions, PaginateResult } from "mongoose";
import { hashValue } from "../utils/crypt.util";


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
    async getById(id: string): Promise<UserDoc | null> {
        const user = await userModel.User.findById(id);
        return user;
    }
    async create(body: CreateUserDto): Promise<UserDoc> {
        const {name, email, password} = body;

        const hashedPassword =  await hashValue(password)

        const user = new userModel.User({
            name, email, password: hashedPassword
        })
        const newUser = await user.save();

        return newUser;
    }
    async update(body: UpdateUserDto, id: string): Promise<boolean> {
        try {
            const {name} = body;
            const user = await this.getById(id)
            if(!user) {
                return false;
            }else {
                await user.updateOne({name})
                return true;
            }
        } catch(err) {
            return false;
        }
        
    }
    async delete(id: string): Promise<boolean> {
        try {
            const user = await this.getById(id)
            if(!user) {
                return false;
            }else {
                await user.deleteOne()
                return true;
            }
        } catch(err) {
            return false;
        }
    }

    async getUserByEmail(email: string): Promise<UserDoc | null> {
        try {
            const user = await userModel.User.findOne({email})
            return user;
        } catch(err) {
            return null;
        }
    }

}

export default new UserService();