import { LocalDbModule } from 'src/local-db/local-db.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';

@Module({
    imports: [LocalDbModule],
    controllers: [TelegramBotController],
    providers: [TelegramBotService],
})
export class TelegramBotModule {}
