import OpenAI from 'openai';

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OPENAI_API_KEY, OPENAI_ASSISTANT_ID } from '../config/constants';
import {
  checkOpenAiCompleteStatusHelper,
  createOpenAIMessage,
  createOpenAiThreadHelper,
  createOpenRunHelper,
  getOpenAiMessageListHelper,
} from './helpers';
import { QuestionDto } from './dto';

@Injectable()
export class AssistantService {
  private readonly logger = new Logger(AssistantService.name);

  private openAI = new OpenAI({
    apiKey: this.config.get(OPENAI_API_KEY),
  });

  constructor(private readonly config: ConfigService) {}

  async createThread() {
    try {
      const id = await createOpenAiThreadHelper(this.openAI);
      return id;
    } catch (error) {
      throw new InternalServerErrorException('No s ha podido crear el chat');
    }
  }

  async createUserQuestion(questionDto: QuestionDto) {
    try {
      const assistantId = this.config.get(OPENAI_ASSISTANT_ID);

      await createOpenAIMessage(this.openAI, {
        ...questionDto,
      });

      const run = await createOpenRunHelper(this.openAI, { threadId: questionDto.threadId, assistantId });
      const result = await checkOpenAiCompleteStatusHelper(this.openAI, {
        runId: run.id,
        threadId: questionDto.threadId,
      });

      if (result === null)
        throw new InternalServerErrorException('No se ha podido obtener respuesta del asistente. Intente de nuevo');

      const messages = await getOpenAiMessageListHelper(this.openAI, {
        threadId: questionDto.threadId,
      });

      return messages.reverse();
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        this.logger.error('Se ha detectado un failed al ejecutar el hilo');
      }

      throw new InternalServerErrorException('No se ha podido obtener respuesta del asistente. Intente de nuevo');
    }
  }
}
