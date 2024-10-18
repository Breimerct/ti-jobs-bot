import { OnModuleInit } from '@nestjs/common';
import { QuickDB } from 'quick.db';
import { ConfigService } from '@nestjs/config';
import { Job } from './local-db.types';
export declare class JobDbService implements OnModuleInit {
    private readonly configService;
    constructor(configService: ConfigService);
    private readonly logger;
    protected db: QuickDB;
    private tableName;
    private jobTable;
    private readonly MONGODB_URI;
    onModuleInit(): Promise<void>;
    addJob(jobData: Job): Promise<void>;
    addJobs(jobs: Record<string, Job>): Promise<void>;
    getAllJobs(): Promise<Record<string, Job>>;
    getJobById(id: string): Promise<Record<string, Job>>;
    deleteJob(id: string): Promise<void>;
}
