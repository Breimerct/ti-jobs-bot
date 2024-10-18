import { ForceReply, InlineKeyboardMarkup, ParseMode, ReplyKeyboardMarkup, ReplyKeyboardRemove } from 'typescript-telegram-bot-api/dist/types';
type MessageTemplate = {
    message: (strings: TemplateStringsArray, userName: string, botName: string) => string;
    options?: {
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
        parse_mode?: ParseMode;
    };
};
export declare const helpTemplate: MessageTemplate;
export declare const startTemplate: MessageTemplate;
export declare const channelTemplate: MessageTemplate;
export declare const infoTemplate: MessageTemplate;
export {};
