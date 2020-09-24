import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from './../schemas/client.schema';
import { ClientDto } from './../dtos/client.dto';

describe('ClientsService', () => {
  let clientService: ClientsService;
  const mockClients = [{ id: 'dasd5as4d5sa4d5asd', firstName: 'Test', lastName: 'Test', email: 'test@test.com' }] as Client[];
  const mockClient = { id: 'dasd5as4d5sa4d5asd', firstName: 'Test', lastName: 'Test', email: 'test@test.com' } as Client;
  const clientDto = Object.assign({ firstName: 'Test', lastName: 'Test', email: 'test@test.com' }) as ClientDto;
  const clientId = 'dasd5as4d5sa4d5asd';

  const mockClientModel = {
    async findById(): Promise<void> {
      return;
    },
    async find(): Promise<void> {
      return;
    },
    async findByIdAndUpdate(): Promise<void> {
      return;
    },
    async findByIdAndDelete(): Promise<void> {
      return;
    },
  };

  beforeAll(async () => {
    mockClientModel.find = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClients) }));
    mockClientModel.findById = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClient) }));
    mockClientModel.findByIdAndUpdate = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClient) }));
    mockClientModel.findByIdAndDelete = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClient) }));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, { provide: getModelToken(Client.name), useValue: mockClientModel }],
    }).compile();

    clientService = module.get<ClientsService>(ClientsService);
  });

  describe('getAllClients', () => {
    it('service should return an array of clients', async () => {
      expect(await clientService.getAllClients()).toBe(mockClients);
    });
  });

  describe('getClient', () => {
    it('service should return a client searched by client id', async () => {
      expect(await clientService.getClient(clientId)).toBe(mockClient);
    });
  });

  describe('updateClient', () => {
    it('service should recive a client id return udated client', async () => {
      expect(await clientService.updateClient(clientId, clientDto, false)).toBe(mockClient);
    });
  });

  describe('deleteClient', () => {
    it('service should recive a client id and return deleted client', async () => {
      expect(await clientService.deleteClient(clientId)).toBe(mockClient);
    });
  });
});
