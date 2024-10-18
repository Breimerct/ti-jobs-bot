import { Job } from 'src/local-db/local-db.types';
import { JobDbService } from 'src/local-db/job-db.service';
export declare class ScrapingService {
    private readonly jobDbService;
    constructor(jobDbService: JobDbService);
    private readonly logger;
    private readonly url;
    scrapeLinkedInJobs(): Promise<Record<string, Job>>;
    private fetchPage;
    private extractJobInfo;
    handleCron(): Promise<void>;
}
