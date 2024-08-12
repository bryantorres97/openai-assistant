import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

export const createOpenAiThreadHelper = async (openAI: OpenAI) => {
  const logger = new Logger('createOpenAiThreadHelper');
  try {
    const thread = await openAI.beta.threads.create();
    return thread.id;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
