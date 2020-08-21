import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getModelToken } from '@nestjs/mongoose';
import { Client } from './../schemas/client.schema';
import { ClientDto } from './../dto/client.dto';

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
  };

  beforeAll(async () => {
    mockClientModel.find = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClients) }));
    mockClientModel.findById = jest.fn().mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(mockClient) }));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, { provide: getModelToken('Client'), useValue: mockClientModel }],
    }).compile();

    clientService = module.get<ClientsService>(ClientsService);
  });

  describe('getAllClients', () => {
    it('service should return an array of clients', async () => {
      expect(await clientService.getAllClients()).toBe(mockClients);
    });
  });

  // describe('getAll', () => {
  //   it('should return httpExeption: http status code no content with message no clients if clients is empty', async () => {
  //     jest.spyOn(clientService, 'getAllClients').mockImplementation(async () => emptyClients);
  //     const httpExp = new HttpException('No clients', HttpStatus.NO_CONTENT);
  //     try {
  //       await clientController.getAll();
  //     } catch (error) {
  //       expect(error).toMatchObject(httpExp);
  //     }
  //   });
  // });

  // describe('get', () => {
  //   it('should return a client', async () => {
  //     jest.spyOn(clientService, 'getClient').mockImplementation(async () => client);

  //     expect(await clientController.get(clientId)).toBe(client);
  //   });
  // });

  // describe('get', () => {
  //   it('should return httpExeption: http status code not found with message no client found', async () => {
  //     jest.spyOn(clientService, 'getClient').mockImplementation(async () => emptyClient);
  //     const httpExp = new HttpException('No client found', HttpStatus.NOT_FOUND);

  //     try {
  //       await clientController.get(clientId);
  //     } catch (error) {
  //       expect(error).toMatchObject(httpExp);
  //     }
  //   });
  // });

  // describe('post', () => {
  //   it('should return recently created client', async () => {
  //     jest.spyOn(clientService, 'create').mockImplementation(async () => client);

  //     expect(await clientController.post(clientDto)).toBe(client);
  //   });
  // });

  // describe('put', () => {
  //   it('should return recently updated client', async () => {
  //     jest.spyOn(clientService, 'update').mockImplementation(async () => client);

  //     expect(await clientController.put(clientId, clientDto)).toBe(client);
  //   });
  // });

  // describe('put', () => {
  //   it('should return httpExeption: http status code not found with message no client found to update', async () => {
  //     jest.spyOn(clientService, 'update').mockImplementation(async () => emptyClient);
  //     const httpExp = new HttpException('No client found to update', HttpStatus.NOT_FOUND);
  //     try {
  //       await clientController.put(clientId, clientDto);
  //     } catch (error) {
  //       expect(error).toMatchObject(httpExp);
  //     }
  //   });
  // });

  // describe('delete', () => {
  //   it('should return recently deleted client', async () => {
  //     jest.spyOn(clientService, 'delete').mockImplementation(async () => client);

  //     expect(await clientController.delete(clientId)).toBe(client);
  //   });
  // });

  // describe('delete', () => {
  //   it('should return httpExeption: http status code not found with message no client found to delete', async () => {
  //     jest.spyOn(clientService, 'delete').mockImplementation(async () => emptyClient);
  //     const httpExp = new HttpException('No client found to delete', HttpStatus.NOT_FOUND);
  //     try {
  //       await clientController.delete(clientId);
  //     } catch (error) {
  //       expect(error).toMatchObject(httpExp);
  //     }
  //   });
  // });
});
