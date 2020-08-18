// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigService, ConfigModule } from '@nestjs/config';

// describe('ClientsController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         AppModule,
//         MongooseModule.forRootAsync({
//           imports: [ConfigModule],
//           useFactory: async (configService: ConfigService) => {
//             const mongod = new MongoMemoryServer();
//             const uri = await mongod.getConnectionString();
//             return {
//               uri: uri,
//             };
//           },
//           inject: [ConfigService],
//         }),
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect(`Running on env: ${process.env.NODE_ENV}`);
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
