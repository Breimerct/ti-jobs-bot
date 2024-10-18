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
var TelegramBotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const schedule_1 = require("@nestjs/schedule");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const job_db_service_1 = require("../local-db/job-db.service");
const typescript_telegram_bot_api_1 = require("typescript-telegram-bot-api");
const telegram_bot_1 = require("./telegram-bot");
let TelegramBotService = TelegramBotService_1 = class TelegramBotService {
    constructor(configService, jobDbService) {
        this.configService = configService;
        this.jobDbService = jobDbService;
        this.logger = new common_1.Logger(TelegramBotService_1.name);
        this.telegramBotToken = this.configService.get('BOT_TOKEN');
        this.chatId = this.configService.get('CHANNEL_ID');
    }
    async onModuleInit() {
        this.telegramBot = new typescript_telegram_bot_api_1.TelegramBot({ botToken: this.telegramBotToken });
        this.telegramBot.startPolling();
        try {
            const { first_name: botName } = await this.telegramBot.getMe();
            this.botName = botName;
            this.logger.log(`Bot iniciado: ${botName}`);
        }
        catch (error) {
            this.logger.error(`Error al iniciar el bot: ${error}`);
        }
        const { onMessage, onCallbackQuery } = (0, telegram_bot_1.handles)(this.botName, this.telegramBot);
        this.telegramBot.on('message:text', onMessage);
        this.telegramBot.on('callback_query', onCallbackQuery);
    }
    async sendMessage(text) {
        return this.telegramBot.sendMessage({
            chat_id: this.chatId,
            text,
        });
    }
    async handleCron() {
        const jobs = await this.jobDbService.getAllJobs();
        const jobId = Object.keys(jobs);
        const randomIndex = Math.floor(Math.random() * jobId.length);
        const job = jobs[jobId[randomIndex]];
        const jobMessage = `✨ **Vacante**: ${job.title}\n` +
            `🏢 **Empresa**: ${job.company}\n` +
            `📍 **Ubicación**: ${job.location}\n` +
            `🗓️ **Fecha de publicación**: ${job.postedDate}`;
        const replryMarkup = {
            inline_keyboard: [
                [{ text: 'Ver oferta', url: job.jobUrl }],
                [{ text: 'Perfil de la empresa', url: job.companyProfileUrl }],
            ],
        };
        if (job.companyImg) {
            await this.telegramBot.sendPhoto({
                chat_id: this.chatId,
                photo: job.companyImg,
                caption: jobMessage,
                reply_markup: replryMarkup,
                parse_mode: 'Markdown',
            });
        }
        if (!job.companyImg) {
            await this.telegramBot.sendMessage({
                chat_id: this.chatId,
                text: jobMessage,
                reply_markup: replryMarkup,
                parse_mode: 'Markdown',
            });
        }
        this.logger.log(`Vacante enviada: ${job.title}`);
    }
};
exports.TelegramBotService = TelegramBotService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES_BETWEEN_10AM_AND_7PM, {
        timeZone: 'America/Bogota',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TelegramBotService.prototype, "handleCron", null);
exports.TelegramBotService = TelegramBotService = TelegramBotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        job_db_service_1.JobDbService])
], TelegramBotService);
//# sourceMappingURL=telegram-bot.service.js.map