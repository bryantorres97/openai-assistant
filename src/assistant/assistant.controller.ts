import { Response } from 'express';
import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { QuestionDto } from './dto';

@Controller('assistant')
export class AssistantController {
  private logger = new Logger(AssistantController.name);

  constructor(private readonly assistantService: AssistantService) {}

  @Get('create-thread')
  async createThread(@Res() res: Response) {
    this.logger.log('Creating thread');
    const threadId = await this.assistantService.createThread();
    return res.status(200).json({ threadId });
  }

  @Post('add-user-message')
  async addUserMessage(@Body() questionDto: QuestionDto, @Res() res: Response) {
    this.logger.log('Adding user message');
    const messages = await this.assistantService.createUserQuestion(questionDto);
    return res.status(201).json(messages);
  }
}
