import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../schemas/client.schema';
import { Model } from 'mongoose';
import { ClientDto } from '../dtos/client.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private _client: Model<Client>) {}

  public async getAllClients(): Promise<Client[]> {
    try {
      return await this._client.find().exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getClient(id: string): Promise<Client> {
    try {
      return await this._client.findById(id).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async createClient(clientDto: ClientDto): Promise<Client> {
    try {
      const newClient = new this._client(clientDto);

      return newClient.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateClient(id: string, clientDto: ClientDto, isWithReplace: boolean): Promise<Client> {
    try {
      return await this._client.findByIdAndUpdate(id, clientDto, { new: isWithReplace }).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async deleteClient(id: string): Promise<Client> {
    try {
      return await this._client.findByIdAndDelete(id).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
