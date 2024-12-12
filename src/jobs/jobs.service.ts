import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schema/job.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async saveManyJobs(jobs: Job[]) {
    try {
      await this.jobModel.insertMany(jobs);
    } catch (error) {
      console.error('Error al guardar los trabajos: ', error);
    }
  }

  async deleteAllJobs() {
    try {
      await this.jobModel.deleteMany();
    } catch (error) {
      console.error('Error al eliminar los trabajos: ', error);
    }
  }

  async getAllJobs() {
    try {
      return await this.jobModel.find().lean();
    } catch (error) {
      console.error('Error al obtener los trabajos: ', error);
      return [];
    }
  }
}
