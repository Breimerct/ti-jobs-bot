import * as cheerio from 'cheerio';

import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

import { Job } from '@/types';
import { JobsService } from '@/jobs/jobs.service';
import axios from 'axios';

@Injectable()
export class ScrapingService {
  constructor(
    private readonly jobsService: JobsService
  ) {}

  private readonly logger = new Logger(ScrapingService.name);

  private readonly url =
    'https://www.linkedin.com/jobs/search?location=colombia&keywords=TI%20desarrollo%20software&trk=public_jobs_jobs-search-bar_search-submit&pageNum=0';

  async scrapeLinkedInJobs() {
    try {
      const html = await this.fetchPage(this.url);
      const jobDetailsList = this.extractJobInfo(html);
      return jobDetailsList;
    } catch (error) {
      this.logger.error('Error en el scraping: ', error);
      return [];
    }
  }

  private async fetchPage(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      this.logger.error('Error desconocido al obtener la página');
      return '';
    }
  }

  private extractJobInfo(html: string): Job[] {
    if (!html) return [];

    const $ = cheerio.load(html);
    const jobCards = $('.base-search-card');
    let jobs: Job[] = [];

    jobCards.each((_, jobCard) => {
      const jobElement = $(jobCard);

      const companyImg =
        jobElement.find('.search-entity-media img').attr('src') || '';
      const title =
        jobElement.find('.base-search-card__title').text().trim() || '';
      const company =
        jobElement.find('.base-search-card__subtitle a').text().trim() || '';
      const postedDate =
        jobElement.find('.job-search-card__listdate').text().trim() || '';
      const jobUrl =
        jobElement.find('.base-card__full-link').attr('href') || '';
      const location =
        jobElement.find('.job-search-card__location').text().trim() || '';
      const companyProfileUrl =
        jobElement.find('.base-search-card__subtitle a').attr('href') || '';

      jobs = [
        ...jobs,
        {
          title,
          company,
          companyImg,
          location,
          postedDate,
          jobUrl,
          companyProfileUrl,
        },
      ];
    });

    return jobs;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'America/Bogota' })
  async handleCron() {
    try {
      const jobs = await this.scrapeLinkedInJobs();

      if (!Object.keys(jobs).length) return;

      await this.jobsService.deleteAllJobs();
      await this.jobsService.saveManyJobs(jobs);

      this.logger.log('Scraping realizado con éxito');
    } catch (error) {
      this.logger.error('Error al realizar el scraping: ', error);
    }
  }
}
