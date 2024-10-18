import { OnModuleInit } from '@nestjs/common';
import { QuickDB } from 'quick.db';
import { Job } from './local-db.types';
export declare class JobDbService implements OnModuleInit {
    protected db: QuickDB;
    private tableName;
    private jobTable;
    onModuleInit(): void;
    addJob(jobData: Job): Promise<void>;
    addJobs(jobs: Record<string, Job>): Promise<void>;
    getAllJobs(): Promise<Record<string, Job>>;
    getJobById(id: string): Promise<Record<string, Job>>;
    deleteJob(id: string): Promise<void>;
}
