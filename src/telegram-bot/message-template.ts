import {
  ForceReply,
  InlineKeyboardMarkup,
  ParseMode,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
} from 'typescript-telegram-bot-api/dist/types';

type MessageTemplate = {
  message: (
    strings: TemplateStringsArray,
    userName: string,
    botName: string,
  ) => string;
  options?: {
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply;
    parse_mode?: ParseMode;
  };
};

export const helpTemplate: MessageTemplate = {
  message: (_: TemplateStringsArray, userName: string, botName: string) =>
    `Hola ${userName}, soy ${botName} 🤖 ` +
    'Puedes usar los siguientes comandos:\n\n' +
    '/start - Inicia la conversación con el bot\n' +
    '/help - Muestra los comandos disponibles\n' +
    '/channel - Muestra el canal de empleos\n' +
    '/info - Muestra información de ayuda\n',
};

export const startTemplate: MessageTemplate = {
  message: (_: TemplateStringsArray, userName: string, botName: string) =>
    `Hola ${userName}, soy ${botName} 🤖 ` +
    'un bot que maneja un canal de empleos en colombia.\n\n' +
    'Para ver las **vacantes**, puedes acceder al canal aquí 👇\n',
  options: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'TI JOBS',
            url: 'https://t.me/ti_jobs',
          },
        ],
      ],
    },
    parse_mode: 'Markdown',
  },
};

export const channelTemplate: MessageTemplate = {
  message: (_: TemplateStringsArray, userName: string, botName: string) =>
    `Hola ${userName}, soy ${botName} 🤖 ` +
    'Puedes acceder al canal de empleos aquí 👇',
  options: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'TI JOBS',
            url: 'https://t.me/ti_jobs',
          },
        ],
      ],
    },
  },
};

export const infoTemplate: MessageTemplate = {
  message: (_: TemplateStringsArray, userName: string, botName: string) =>
    `Hola ${userName}, soy ${botName} 🤖 ` +
    'Puedes pedir ayuda con el comando /help o ' +
    'hacer click en el botón de abajo 👇',
  options: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Ayuda',
            callback_data: '/help',
          },
        ],
      ],
    },
    parse_mode: 'Markdown',
  },
};
