import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'API is running! 🚀',
      date: new Date(),
    };
  }
}
