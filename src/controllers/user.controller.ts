import express from 'express';
import userService from "../services/user.service";
import {ERRORS_M, RESPONSE_M} from '../dto/error.dto'

export interface Query {
    page: number;
    limit: number;
}

class UserController {
    
    async getAll(req: express.Request, res: express.Response) {
        try {
            const {page, limit} = req.query;
            const users = await userService.getAll(parseInt(page as string || ''), parseInt(limit as string || ''));
            res.json( users)
        } catch(err) {
            res.status(500).json({message: err})
        }
        
    }
    async getById(req: express.Request, res: express.Response): Promise<void> {
        try {
            const {id} = req.params;
            const user = await userService.getById(id);
            res.json({user});
        }catch(err){
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err});
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = await userService.create(req.body);
            res.json({user})
        } catch(err) {
            res.status(err === ERRORS_M.ALREADY_EXISTS ? 400 : 500).json({message: err})
        }
        
    }
    async update(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params;
            await userService.update(req.body, id)
            res.json({message: RESPONSE_M.OK})
        } catch(err){
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err})
        }
    }
    async delete(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params;
            await userService.delete(id)
            res.json({message: RESPONSE_M.OK})
        } catch(err) {
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err})
        }
    }

}

export default new UserController();