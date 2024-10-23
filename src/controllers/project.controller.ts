import express from 'express';
import projectService from "../services/project.service";
import {ERRORS_M, RESPONSE_M} from '../dto/error.dto'

export interface Query {
    page: number;
    limit: number;
}

class ProjectController {
    
    async getAll(req: express.Request, res: express.Response) {
        try {
            const {user} = req.headers;
            const {page, limit} = req.query;
            const users = await projectService.getAll(parseInt(page as string || ''), parseInt(limit as string || ''), user as string);
            res.json( users)
        } catch(err) {
            res.status(500).json({message: err})
        }
        
    }
    async getById(req: express.Request, res: express.Response): Promise<void> {
        try {
            const {id} = req.params;
            const user = await projectService.getById(id);
            res.json({user});
        }catch(err){
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err});
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const {user} = req.headers;
            req.body.user = user;
            const client = await projectService.create(req.body);
            res.json({client})
        } catch(err) {
            res.status(err === ERRORS_M.ALREADY_EXISTS ? 400 : 500).json({message: err})
        }
        
    }
    async update(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params;
            await projectService.update(req.body, id)
            res.json({message: RESPONSE_M.OK})
        } catch(err){
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err})
        }
    }
    async delete(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params;
            await projectService.delete(id)
            res.json({message: RESPONSE_M.OK})
        } catch(err) {
            res.status(err === ERRORS_M.NOT_FOUND ? 404 : 500).json({message: err})
        }
    }

}

export default new ProjectController();