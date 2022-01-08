import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly hello = 'Hello World!';

  getHello(): string {
    return this.hello;
  }
}
