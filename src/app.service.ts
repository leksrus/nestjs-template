import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Running on env: ${process.env.NODE_ENV}`;
  }
}
