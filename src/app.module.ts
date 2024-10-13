import { ConfigModule } from '@nestjs/config';
import { LocalDbModule } from './local-db/local-db.module';
import { Module } from '@nestjs/common';
import { ScrapingModule } from './scraping/scraping.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'src', 'assets'),
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
