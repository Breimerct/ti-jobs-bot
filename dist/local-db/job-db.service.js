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
var JobDbService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDbService = void 0;
const common_1 = require("@nestjs/common");
const quick_db_1 = require("quick.db");
const config_1 = require("@nestjs/config");
const quickmongo_1 = require("quickmongo");
let JobDbService = JobDbService_1 = class JobDbService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(JobDbService_1.name);
        this.tableName = 'jobs';
        this.jobTable = new quick_db_1.QuickDB();
        this.MONGODB_URI = this.configService.get('MONGODB_URI');
    }
    async onModuleInit() {
        const driver = new quickmongo_1.MongoDriver(this.MONGODB_URI);
        await driver.connect().then(() => {
            this.logger.log('Connected to MongoDB');
        });
        this.db = new quick_db_1.QuickDB({
            driver,
            table: this.tableName,
        });
        this.jobTable = this.db.table(this.tableName);
    }
    async addJob(jobData) {
        await this.jobTable.set(`${this.tableName}.${jobData.id}`, jobData);
    }
    async addJobs(jobs) {
        await this.jobTable.set(this.tableName, jobs);
    }
    async getAllJobs() {
        return await this.jobTable.get(this.tableName);
    }
    async getJobById(id) {
        return await this.jobTable.get(`${this.tableName}.${id}`);
    }
    async deleteJob(id) {
        await this.jobTable.delete(`${this.tableName}.${id}`);
    }
};
exports.JobDbService = JobDbService;
exports.JobDbService = JobDbService = JobDbService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JobDbService);
//# sourceMappingURL=job-db.service.js.map