import { TelegramBotService } from './telegram-bot.service';
export declare class TelegramBotController {
    private readonly telegramBotService;
    constructor(telegramBotService: TelegramBotService);
    sendMessage(message: string): Promise<import("typescript-telegram-bot-api/dist/types").Message>;
}
