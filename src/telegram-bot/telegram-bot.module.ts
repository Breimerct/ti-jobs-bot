import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [TelegramBotController],
    providers: [TelegramBotService],
})
export class TelegramBotModule {}
