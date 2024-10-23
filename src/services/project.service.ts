import { CreateProjectDto, UpdateProjectDto } from "../dto/project.dto";
import projectModel, { ProjectDoc } from "../models/project.model";
import { PaginateOptions, PaginateResult } from "mongoose";
import {ERRORS_M} from '../dto/error.dto'


class ClientService {
    
    async getAll(page: number = 1, limit: number = 10, user: string): Promise<PaginateResult<ProjectDoc>> {
        const options: PaginateOptions = {
            page,
            offset: (page - 1) * limit,
            limit,
            collation: {
              locale: 'es',
            },
        };
        const clients = await projectModel.Project.paginate({user}, options);
        return clients;
    }
    async getById(id: string): Promise<ProjectDoc> {
        const client = await projectModel.Project.findById(id);
        if(!client) {
            throw ERRORS_M.NOT_FOUND;
        }
        return client;
    }
    async create(body: CreateProjectDto): Promise<ProjectDoc> {
        const {name, user, client} = body;

        const project = new projectModel.Project({
            name, client, user
        })
        const newClient = await project.save();

        return newClient;
    }
    async update(body: UpdateProjectDto, id: string): Promise<void> {
        const {name} = body;
        const project = await this.getById(id)
        if(!project) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await project.updateOne({name})
        }
    }
    async delete(id: string): Promise<void> {
        const project = await this.getById(id)
        if(!project) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await project.deleteOne()
        }
    }

}

export default new ClientService();