import { ConfigModule } from '@nestjs/config';
import { LocalDbModule } from './local-db/local-db.module';
import { Module } from '@nestjs/common';
import { ScrapingModule } from './scraping/scraping.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TelegramBotModule,
    LocalDbModule,
    ScrapingModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
