import { JobsModule } from '../jobs/jobs.module';
import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';

@Module({
    imports: [JobsModule],
    controllers: [TelegramBotController],
    providers: [TelegramBotService],
})
export class TelegramBotModule {}
