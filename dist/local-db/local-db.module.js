"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDbModule = void 0;
const common_1 = require("@nestjs/common");
const job_db_service_1 = require("./job-db.service");
let LocalDbModule = class LocalDbModule {
};
exports.LocalDbModule = LocalDbModule;
exports.LocalDbModule = LocalDbModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [job_db_service_1.JobDbService],
        exports: [job_db_service_1.JobDbService],
    })
], LocalDbModule);
//# sourceMappingURL=local-db.module.js.map