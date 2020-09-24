import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { Client } from './schemas/client.schema';
import { ClientDto } from './dtos/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly _clientService: ClientsService) {}

  @Get()
  public async getAll(): Promise<Client[]> {
    const clients = await this._clientService.getAllClients();

    if (!clients.length) throw new HttpException('No clients', HttpStatus.NO_CONTENT);

    return clients;
  }

  @Get(':id')
  public async get(@Param('id') id: string): Promise<Client> {
    const client = await this._clientService.getClient(id);

    if (!client) throw new HttpException('No client found', HttpStatus.NOT_FOUND);

    return client;
  }

  @Post()
  public async post(@Body() clientDTO: ClientDto): Promise<Client> {
    return await this._clientService.createClient(clientDTO);
  }

  @Put(':id')
  public async put(@Param('id') id: string, @Body() clientDTO: ClientDto): Promise<Client> {
    return await this._clientService.updateClient(id, clientDTO, true);
  }

  @Patch(':id')
  public async patch(@Param('id') id: string, @Body() clientDTO: ClientDto): Promise<Client> {
    return await this._clientService.updateClient(id, clientDTO, false);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Client> {
    const client = await this._clientService.deleteClient(id);

    if (!client) throw new HttpException('No client found to delete', HttpStatus.NOT_FOUND);

    return client;
  }
}
