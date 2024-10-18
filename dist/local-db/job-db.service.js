"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDbService = void 0;
const common_1 = require("@nestjs/common");
const quick_db_1 = require("quick.db");
let JobDbService = class JobDbService {
    constructor() {
        this.tableName = 'jobs';
        this.jobTable = new quick_db_1.QuickDB();
    }
    onModuleInit() {
        this.db = new quick_db_1.QuickDB({
            driver: new quick_db_1.JSONDriver(),
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
exports.JobDbService = JobDbService = __decorate([
    (0, common_1.Injectable)()
], JobDbService);
//# sourceMappingURL=job-db.service.js.map