import { Injectable, OnModuleInit } from '@nestjs/common';
import { JSONDriver, QuickDB } from 'quick.db';

import { Job } from './local-db.types';

@Injectable()
export class JobDbService implements OnModuleInit {
  protected db: QuickDB;
  private tableName = 'jobs';
  private jobTable = new QuickDB<Record<string, Job>>();

  async onModuleInit() {
    this.db = new QuickDB({
      driver: new JSONDriver(),
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
