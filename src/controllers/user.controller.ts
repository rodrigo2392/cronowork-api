import express from 'express';
import userService from "../services/user.service";

export interface Query {
    page: number;
    limit: number;
}

class UserController {
    
    async getAll(req: express.Request, res: express.Response) {
        const {page, limit} = req.query;
        const users = await userService.getAll(parseInt(page as string || ''), parseInt(limit as string || ''));
        res.json( users)
    }
    async getById(req: express.Request, res: express.Response): Promise<void> {
        const {id} = req.params;
        const user = await userService.getById(id);
        if(!user) {
            res.status(404).json({message: "not found"})
        }else {
            res.json({user})
        }
        
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const user = await userService.create(req.body);
        res.json({user})
    }
    async update(req: express.Request, res: express.Response) {
        const {id} = req.params;
        const updated = await userService.update(req.body, id)
        if(!updated) {
            res.status(404).json({message: "not found"})
        }else {
            res.json({message: 'ok'})
        }
    }
    async delete(req: express.Request, res: express.Response) {
        const {id} = req.params;
        const deleted = await userService.delete(id)
        if(deleted) {
            res.json({message: 'ok'})
        } else {
            res.status(500).json({message: 'an error ocurred'})
        }
    }

}

export default new UserController();