import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop({ unique: false })
  title: string;

  @Prop({ unique: false })
  company: string;

  @Prop({ required: false, default: null, unique: false })
  companyImg?: string;

  @Prop({ unique: false })
  location: string;

  @Prop({ unique: false })
  postedDate: string;

  @Prop({ unique: false })
  jobUrl: string;

  @Prop({ required: false, default: null, unique: false })
  salary?: string;

  @Prop({ required: false, default: null, unique: false })
  companyProfileUrl?: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
