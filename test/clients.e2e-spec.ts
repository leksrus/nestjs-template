import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { ClientsModule } from './../src/clients/clients.module';
import { ClientsService } from './../src/clients/services/clients.service';
import { ClientDto } from './../src/clients/dto/client.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from './../src/clients/schemas/client.schema';
import { Model, Mongoose } from 'mongoose';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let uri: string;
  let db: Mongoose;
  const clientDto = Object.assign({ firstName: 'Test', lastName: 'Test', email: 'test@test.com' }) as ClientDto;
  const updatedClientDto = Object.assign({ firstName: 'new Test', lastName: 'new Test', email: 'newtest@test.com' }) as ClientDto;
  let clientId: string;
  let clients: Array<Client>;
  let clientModel: Model<Client>;
  let client: Client;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.test'],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            useFindAndModify: false,
          }),
          inject: [ConfigService],
        }),
        ClientsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get<ConfigService>(ConfigService);
    uri = configService.get<string>('MONGODB_URI');
    db = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db.connection.dropDatabase();
    clientModel = mongoose.model<Client>(Client.name);
    const newClient = new clientModel(clientDto);
    client = await newClient.save();
    clients = await clientModel.find().exec();
    clientId = client.id;
    await app.init();
  });

  it('/api/clients (GET)', async () => {
    return request(app.getHttpServer())
      .get('/clients')
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(clients));
  });

  it('/api/clients (GET :id)', async () => {
    return request(app.getHttpServer())
      .get(`/clients/${clientId}`)
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(client));
  });

  it('/api/clients (GET :id) http not found', async () => {
    return request(app.getHttpServer())
      .get('/clients/5f44587caba6a4432c92f1b1') //random mongo id
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/api/clients (post)', async () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send(clientDto)
      .expect(HttpStatus.CREATED);
  });

  it('/api/clients (Put)', async () => {
    return request(app.getHttpServer())
      .put(`/clients/${clientId}`)
      .send(updatedClientDto)
      .expect(HttpStatus.OK);
  });

  it('/api/clients (Patch)', async () => {
    return request(app.getHttpServer())
      .patch(`/clients/${clientId}`)
      .send(updatedClientDto)
      .expect(HttpStatus.OK);
  });

  it('/api/clients (Delete)', async () => {
    return request(app.getHttpServer())
      .delete(`/clients/${clientId}`)
      .expect(HttpStatus.OK);
  });

  it('/api/clients (Delete) http not found', async () => {
    return request(app.getHttpServer())
      .delete('/clients/5f44587caba6a4432c92f1b1') //random mongo id
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await db.connection.dropDatabase();
    await db.connection.close();
    await app.close();
  });
});
