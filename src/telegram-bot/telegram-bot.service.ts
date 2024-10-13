import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JobDbService } from 'src/local-db/job-db.service';
import { TelegramBot } from 'typescript-telegram-bot-api';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly jobDbService: JobDbService,
  ) {}

  private readonly logger = new Logger(TelegramBotService.name);
  private telegramBot: TelegramBot;
  private readonly telegramBotToken =
    this.configService.get<string>('BOT_TOKEN');
  private readonly chatId = this.configService.get<string>('CHANNEL_ID');

  onModuleInit() {
    this.telegramBot = new TelegramBot({ botToken: this.telegramBotToken });

    this.telegramBot
      .getMe()
      .then(({ first_name }) => {
        console.log(`Bot ${first_name} is ready`);
      })
      .catch(console.error);
  }

  async sendMessage(text: string) {
    return this.telegramBot.sendMessage({ chat_id: this.chatId, text });
  }

  @Cron(CronExpression.EVERY_30_MINUTES_BETWEEN_10AM_AND_7PM, { timeZone: 'America/Bogota' })
  async handleCron() {
    const jobs = await this.jobDbService.getAllJobs();
    const jobId = Object.keys(jobs);
    const randomIndex = Math.floor(Math.random() * jobId.length);
    const job = jobs[jobId[randomIndex]];

    const jobMessage = `✨ **Vacante**: ${job.title}\n\n🏢 **Empresa**: ${job.company}\n\n📍 **Ubicación**: ${job.location}\n\n🗓️ **Fecha de publicación**: ${job.postedDate}\n\n🔗 [Link a la vacante](${job.jobUrl})\n\n🌐 [Perfil de la empresa](${job.companyProfileUrl})`;

    if (job.companyImg) {
      await this.telegramBot.sendPhoto({
        chat_id: this.chatId,
        photo: job.companyImg,
        caption: jobMessage,
      });
    }

    if (!job.companyImg) {
      await this.telegramBot.sendMessage({
        chat_id: this.chatId,
        text: jobMessage,
      });
    }

    this.logger.log(`Vacante enviada: ${job.title}`);
  }
}
