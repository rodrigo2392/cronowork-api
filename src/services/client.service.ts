import { CreateClientDto, UpdateClientDto } from "../dto/client.dto";
import clientModel, { ClientDoc } from "../models/client.model";
import { PaginateOptions, PaginateResult } from "mongoose";
import {ERRORS_M} from '../dto/error.dto'


class ClientService {
    
    async getAll(page: number = 1, limit: number = 10, user: string): Promise<PaginateResult<ClientDoc>> {
        const options: PaginateOptions = {
            page,
            offset: (page - 1) * limit,
            limit,
            collation: {
              locale: 'es',
            },
        };
        const clients = await clientModel.Client.paginate({user}, options);
        return clients;
    }
    async getById(id: string): Promise<ClientDoc> {
        const client = await clientModel.Client.findById(id);
        if(!client) {
            throw ERRORS_M.NOT_FOUND;
        }
        return client;
    }
    async create(body: CreateClientDto): Promise<ClientDoc> {
        const {name, email, user} = body;

        const exists = await this.getClientByEmail(email)

        if(exists) {
            throw ERRORS_M.ALREADY_EXISTS;
        }

        const client = new clientModel.Client({
            name, email, user
        })
        const newClient = await client.save();

        return newClient;
    }
    async update(body: UpdateClientDto, id: string): Promise<void> {
        const {name} = body;
        const client = await this.getById(id)
        if(!client) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await client.updateOne({name})
        }
    }
    async delete(id: string): Promise<void> {
        const client = await this.getById(id)
        if(!client) {
            throw ERRORS_M.NOT_FOUND;
        }else {
            await client.deleteOne()
        }
    }

    async getClientByEmail(email: string): Promise<ClientDoc | null> {
        const client = await clientModel.Client.findOne({email})
        return client;
    }

}

export default new ClientService();