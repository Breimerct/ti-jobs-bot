import { ConfigModule, ConfigService } from '@nestjs/config'

import { JobsModule } from './jobs/jobs.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingModule } from './scraping/scraping.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: ".env.dev",
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TelegramBotModule,
    ScrapingModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
