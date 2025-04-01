import { CallbackQuery, Message } from 'typescript-telegram-bot-api/dist/types';
import {
  channelTemplate,
  helpTemplate,
  infoTemplate,
  startTemplate,
} from './message-template';

import { CommandType } from '@/types';
import { TelegramBot } from 'typescript-telegram-bot-api';

export const handles = (botName: string, telegramBot: TelegramBot) => ({
  onMessage: async (message: Message) =>
    onMessage(message, telegramBot, botName),

  onCallbackQuery: async (message: CallbackQuery) =>
    onCallbackQuery(message, telegramBot, botName),
});

async function onMessage(
  message: Message,
  telegramBot: TelegramBot,
  botName: string,
) {
  if (message.text === CommandType.START) {
    const startText = startTemplate.message`${message.from.first_name} ${botName}`;
    const infoText = infoTemplate.message`${message.from.first_name} ${botName}`;

    await telegramBot.sendMessage({
      chat_id: message.chat.id,
      text: startText,
      ...startTemplate.options,
    });

    await telegramBot.sendMessage({
      chat_id: message.chat.id,
      text: infoText,
        ...infoTemplate.options,
    });

    return;
  }

  if (message.text === CommandType.HELP) {
    const text = helpTemplate.message`${message.from.first_name} ${botName}`;

    telegramBot.sendMessage({
      chat_id: message.chat.id,
      text,
    });

    return;
  }

  if (message.text === CommandType.CHANNEL) {
    const text = channelTemplate.message`${message.from.first_name} ${botName}`;

    telegramBot.sendMessage({
      chat_id: message.chat.id,
      text,
      ...channelTemplate.options,
    });

    return;
  }

  if (message.text === CommandType.INFO) {
    const text = infoTemplate.message`${message.from.first_name} ${botName}`;

    telegramBot.sendMessage({
      chat_id: message.chat.id,
      text,
      ...infoTemplate.options,
    });

    return;
  }
}

async function onCallbackQuery(
  callbackQuery: CallbackQuery,
  telegramBot: TelegramBot,
  botName: string,
) {
  if (callbackQuery.data === '/help') {
    const text = helpTemplate.message`${callbackQuery.from.first_name} ${botName}`;

    telegramBot.sendMessage({
      chat_id: callbackQuery.message.chat.id,
      text,
    });
  }
}
