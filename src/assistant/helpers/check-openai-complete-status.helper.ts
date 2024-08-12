import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkOpenAiCompleteStatusHelper = async (openai: OpenAI, options: Options) => {
  const logger = new Logger('checkOpenAiCompleteStatusHelper');
  const { runId, threadId } = options;

  try {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    logger.log(`Run status: ${runStatus.status}`);

    if (runStatus.status === 'completed') return runStatus;
    if (runStatus.status === 'failed') return null;

    await wait(1500);
    return await checkOpenAiCompleteStatusHelper(openai, options);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
