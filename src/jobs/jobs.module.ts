import { Job, JobSchema } from './schema/job.schema';

import { JobsService } from './jobs.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
