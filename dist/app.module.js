"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const local_db_module_1 = require("./local-db/local-db.module");
const common_1 = require("@nestjs/common");
const scraping_module_1 = require("./scraping/scraping.module");
const serve_static_1 = require("@nestjs/serve-static");
const telegram_bot_module_1 = require("./telegram-bot/telegram-bot.module");
const path_1 = require("path");
const { NODE_ENV } = process.env;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [NODE_ENV === 'prod' ? '.env' : `.env.${NODE_ENV}`],
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'src', 'assets'),
            }),
            telegram_bot_module_1.TelegramBotModule,
            local_db_module_1.LocalDbModule,
            scraping_module_1.ScrapingModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map