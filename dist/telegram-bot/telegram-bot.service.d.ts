import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobDbService } from 'src/local-db/job-db.service';
export declare class TelegramBotService implements OnModuleInit {
    private readonly configService;
    private readonly jobDbService;
    private readonly logger;
    private telegramBot;
    private readonly telegramBotToken;
    private readonly chatId;
    protected botName: string;
    constructor(configService: ConfigService, jobDbService: JobDbService);
    onModuleInit(): Promise<void>;
    sendMessage(text: string): Promise<import("typescript-telegram-bot-api/dist/types").Message>;
    handleCron(): Promise<void>;
}
