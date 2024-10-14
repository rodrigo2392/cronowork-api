import jwt from 'jsonwebtoken';
import userService from './user.service'
import { compareValues } from "../utils/crypt.util";


class AuthService {
    async login(email: string, password: string) {
        const user = await userService.getUserByEmail(email);
        if(user) {
            const result = await compareValues(password, user?.password || '');
            if(result) {
                try {
                    const userValues = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                    const token = await jwt.sign(userValues, process.env.TOKEN_SECRET, { expiresIn: '60 m' });
                    return token;
                } catch(err){
                    console.log({err})
                    throw err;
                }
            } else{
                throw 'wrong email/password'
            }
           
        } else{
            throw 'user not found'
        }
    }
}

export default new AuthService();