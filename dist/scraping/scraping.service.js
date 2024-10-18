"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScrapingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingService = void 0;
const cheerio = require("cheerio");
const schedule_1 = require("@nestjs/schedule");
const common_1 = require("@nestjs/common");
const job_db_service_1 = require("../local-db/job-db.service");
const axios_1 = require("axios");
let ScrapingService = ScrapingService_1 = class ScrapingService {
    constructor(jobDbService) {
        this.jobDbService = jobDbService;
        this.logger = new common_1.Logger(ScrapingService_1.name);
        this.url = 'https://www.linkedin.com/jobs/search?location=colombia&keywords=TI%20desarrollo%20software&trk=public_jobs_jobs-search-bar_search-submit&pageNum=0';
    }
    async scrapeLinkedInJobs() {
        try {
            const html = await this.fetchPage(this.url);
            const jobDetailsList = this.extractJobInfo(html);
            return jobDetailsList;
        }
        catch (error) {
            this.logger.error('Error en el scraping: ', error);
            return {};
        }
    }
    async fetchPage(url) {
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            this.logger.error('Error desconocido al obtener la página');
            return '';
        }
    }
    extractJobInfo(html) {
        if (!html)
            return {};
        const $ = cheerio.load(html);
        const jobCards = $('.base-search-card');
        let jobs = {};
        jobCards.each((_, jobCard) => {
            const jobElement = $(jobCard);
            const companyImg = jobElement.find('.search-entity-media img').attr('src') || '';
            const title = jobElement.find('.base-search-card__title').text().trim() || '';
            const company = jobElement.find('.base-search-card__subtitle a').text().trim() || '';
            const postedDate = jobElement.find('.job-search-card__listdate').text().trim() || '';
            const jobUrl = jobElement.find('.base-card__full-link').attr('href') || '';
            const location = jobElement.find('.job-search-card__location').text().trim() || '';
            const companyProfileUrl = jobElement.find('.base-search-card__subtitle a').attr('href') || '';
            const jobIdMatch = jobUrl.match(/view\/.*?-(\d+)\?/);
            const id = jobIdMatch ? jobIdMatch[1] : '';
            if (!id)
                return;
            jobs = {
                ...jobs,
                [id]: {
                    id,
                    title,
                    company,
                    location,
                    postedDate,
                    jobUrl,
                    companyProfileUrl,
                    companyImg,
                },
            };
        });
        return jobs;
    }
    async handleCron() {
        try {
            const jobs = await this.scrapeLinkedInJobs();
            if (!Object.keys(jobs).length)
                return;
            this.jobDbService.addJobs(jobs);
            this.logger.log('Scraping realizado con éxito');
        }
        catch (error) {
            this.logger.error('Error al realizar el scraping: ', error);
        }
    }
};
exports.ScrapingService = ScrapingService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES, { timeZone: 'America/Bogota' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScrapingService.prototype, "handleCron", null);
exports.ScrapingService = ScrapingService = ScrapingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [job_db_service_1.JobDbService])
], ScrapingService);
//# sourceMappingURL=scraping.service.js.map