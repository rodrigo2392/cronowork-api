import express from 'express'
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { ERRORS_M } from '../dto/error.dto';

class AuthController {
    async login(req: express.Request, res: express.Response) {
        try {
            const {email, password} = req.body;
            const user = await authService.login(email, password)
            res.json({user})
        }catch(error) {
            res.status(400).json({message: error})
        }
    }

    async register(req: express.Request, res: express.Response) {
        try {
            const user = await userService.create(req.body);
            res.json({user})
        } catch(err) {
            console.log(err)
            res.status(err === ERRORS_M.ALREADY_EXISTS ? 400 : 500).json({message: err})
        }
    }
}

export default new AuthController();