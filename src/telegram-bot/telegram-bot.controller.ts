import { Controller, Get, Post, Query } from '@nestjs/common';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TelegramBotService } from './telegram-bot.service';

@ApiTags('Telegram Bot')
@Controller('telegram-bot')
export class TelegramBotController {
    constructor(private readonly telegramBotService: TelegramBotService) {}

    @Post("send-message")
    @ApiQuery({ name: 'message', required: false })
    sendMessage(@Query('message') message: string) {
        return this.telegramBotService.sendMessage(message);
    }
}
