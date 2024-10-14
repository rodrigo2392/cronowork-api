import express from 'express'
import authService from '../services/auth.service';

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
        throw 'not implemented'
    }
}

export default new AuthController();