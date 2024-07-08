import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class AppResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  date: Date;
}

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'App Controller',
    description: 'Muestra un mensaje y la hora del sistema',
  })
  @ApiOkResponse({
    description: 'Mensaje y hora del sistema',
    type: AppResponse,
    example: {
      message: 'API is running! 🚀',
      date: '2024-07-08T22:59:57.750Z',
    },
  })
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
