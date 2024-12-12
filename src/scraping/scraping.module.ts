import { LocalDbModule } from 'src/local-db/local-db.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingService } from './scraping.service';

@Module({
    imports: [LocalDbModule],
    providers: [ScrapingService],
    exports: [ScrapingService],
})
export class ScrapingModule {}
