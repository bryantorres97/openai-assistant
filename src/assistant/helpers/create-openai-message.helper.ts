import OpenAI from 'openai';
import { Logger } from '@nestjs/common';

type CreateMessageHelperOptions = {
  threadId: string;
  question: string;
};

export const createOpenAIMessage = async (openai: OpenAI, options: CreateMessageHelperOptions) => {
  const logger = new Logger('createOpenAIMessage');
  try {
    const { threadId, question } = options;
    const message = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question,
    });
    return message;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
