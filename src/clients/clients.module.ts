import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { clientSchema } from './schemas/client.schema';
import { ClientsController } from './clients.controller';
import { ClientsService } from './services/clients.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
