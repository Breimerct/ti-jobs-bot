import { CallbackQuery, Message } from 'typescript-telegram-bot-api/dist/types';
import { TelegramBot } from 'typescript-telegram-bot-api';
export declare const handles: (botName: string, telegramBot: TelegramBot) => {
    onMessage: (message: Message) => Promise<void>;
    onCallbackQuery: (message: CallbackQuery) => Promise<void>;
};
