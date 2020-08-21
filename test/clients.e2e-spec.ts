import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClientsModule } from './../src/clients/clients.module';
import { ClientsService } from './../src/clients/services/clients.service';
import { ClientDto } from './../src/clients/dto/client.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let uri: string;
  let clientService: ClientsService;
  const clientDto = Object.assign({ firstName: 'Test', lastName: 'Test', email: 'test@test.com' }) as ClientDto;

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
          }),
          inject: [ConfigService],
        }),
        ClientsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get<ConfigService>(ConfigService);
    clientService = app.get<ClientsService>(ClientsService);
    uri = configService.get<string>('MONGODB_URI');
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.dropDatabase();
    await app.init();
  });

  it('/api/clients (GET)', async () => {
    const clients = new Array(await clientService.createClient(clientDto));
    return request(app.getHttpServer())
      .get('/clients')
      .expect(200)
      .expect(JSON.stringify(clients));
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close();
  });
});
