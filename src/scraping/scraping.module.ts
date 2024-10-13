import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingService } from './scraping.service';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [ScrapingService],
    exports: [ScrapingService],
})
export class ScrapingModule {}
