import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JSONDriver, QuickDB } from 'quick.db';

import { ConfigService } from '@nestjs/config';
import { Job } from './local-db.types';
import { MongoDriver } from 'quickmongo';

@Injectable()
export class JobDbService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(JobDbService.name);
  protected db: QuickDB;
  private tableName = 'jobs';
  private jobTable = new QuickDB<Record<string, Job>>();
  private readonly MONGODB_URI = this.configService.get<string>('MONGODB_URI');
  
  async onModuleInit() {
    const driver = new MongoDriver(this.MONGODB_URI);

    await driver.connect().then(() => {
      this.logger.log('Connected to MongoDB');
    });

    this.db = new QuickDB({
      driver,
      table: this.tableName,
    });
    this.jobTable = this.db.table<Record<string, Job>>(this.tableName);
  }

  async addJob(jobData: Job) {
    await this.jobTable.set(`${this.tableName}.${jobData.id}`, jobData);
  }

  async addJobs(jobs: Record<string, Job>) {
    await this.jobTable.set(this.tableName, jobs);
  }

  async getAllJobs() {
    return await this.jobTable.get(this.tableName);
  }

  async getJobById(id: string) {
    return await this.jobTable.get(`${this.tableName}.${id}`);
  }

  async deleteJob(id: string) {
    await this.jobTable.delete(`${this.tableName}.${id}`);
  }
}
