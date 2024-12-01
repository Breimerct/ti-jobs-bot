import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JobDbService } from 'src/local-db/job-db.service';
import { TelegramBot } from 'typescript-telegram-bot-api';
import { handles } from './telegram-bot';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private readonly logger = new Logger(TelegramBotService.name);
  private telegramBot: TelegramBot;
  private readonly telegramBotToken =
    this.configService.get<string>('BOT_TOKEN');
  private readonly chatId = this.configService.get<string>('CHANNEL_ID');
  protected botName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jobDbService: JobDbService,
  ) {}

  async onModuleInit() {
    this.telegramBot = new TelegramBot({ botToken: this.telegramBotToken });
    this.telegramBot.startPolling();

    try {
      const { first_name: botName } = await this.telegramBot.getMe();
      this.botName = botName;
      this.logger.log(`Bot iniciado: ${botName}`);
    } catch (error) {
      this.logger.error(`Error al iniciar el bot: ${error}`);
    }

    const { onMessage, onCallbackQuery } = handles(
      this.botName,
      this.telegramBot,
    );

    this.telegramBot.on('message:text', onMessage);
    this.telegramBot.on('callback_query', onCallbackQuery);
  }

  async sendMessage(text: string) {
    return this.telegramBot.sendMessage({
      chat_id: this.chatId,
      text,
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES_BETWEEN_9AM_AND_6PM, {
    timeZone: 'America/Bogota',
  })
  async handleCron() {
    const jobs = await this.jobDbService.getAllJobs();
    const jobId = Object.keys(jobs);
    const randomIndex = Math.floor(Math.random() * jobId.length);
    const job = jobs[jobId[randomIndex]];

    const jobMessage =
      `✨ **Vacante**: ${job.title}\n` +
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
}
