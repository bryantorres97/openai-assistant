import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface CreateRunOptions {
  threadId: string;
  assistantId: string;
}

export const createOpenRunHelper = async (openai: OpenAI, options: CreateRunOptions) => {
  const logger = new Logger('createOpenRunHelper');
  try {
    const { threadId, assistantId } = options;
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    return run;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
