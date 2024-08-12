import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  threadId: string;
}

export const getOpenAiMessageListHelper = async (openAI: OpenAI, options: Options) => {
  const logger = new Logger('getOpenAiMessageListHelper');
  const { threadId } = options;
  try {
    const messageList = await openAI.beta.threads.messages.list(threadId);

    const messages = messageList.data.map((message) => {
      return {
        role: message.role,
        content: message.content.map((content: any) => content.text.value),
      };
    });

    return messages;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
