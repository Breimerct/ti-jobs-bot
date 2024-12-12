import { JobsModule } from '@/jobs/jobs.module';
import { Module } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Module({
    imports: [JobsModule],
    providers: [ScrapingService],
    exports: [ScrapingService],
})
export class ScrapingModule {}
