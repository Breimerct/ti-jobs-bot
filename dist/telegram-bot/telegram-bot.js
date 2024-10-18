"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handles = void 0;
const message_template_1 = require("./message-template");
const handles = (botName, telegramBot) => ({
    onMessage: async (message) => onMessage(message, telegramBot, botName),
    onCallbackQuery: async (message) => onCallbackQuery(message, telegramBot, botName),
});
exports.handles = handles;
async function onMessage(message, telegramBot, botName) {
    if (message.text === '/start') {
        const startText = message_template_1.startTemplate.message `${message.from.first_name} ${botName}`;
        const infoText = message_template_1.infoTemplate.message `${message.from.first_name} ${botName}`;
        await telegramBot.sendMessage({
            chat_id: message.chat.id,
            text: startText,
            ...message_template_1.startTemplate.options,
        });
        await telegramBot.sendMessage({
            chat_id: message.chat.id,
            text: infoText,
            ...message_template_1.infoTemplate.options,
        });
        return;
    }
    if (message.text === '/help') {
        const text = message_template_1.helpTemplate.message `${message.from.first_name} ${botName}`;
        telegramBot.sendMessage({
            chat_id: message.chat.id,
            text,
        });
        return;
    }
    if (message.text === '/channel') {
        const text = message_template_1.channelTemplate.message `${message.from.first_name} ${botName}`;
        telegramBot.sendMessage({
            chat_id: message.chat.id,
            text,
            ...message_template_1.channelTemplate.options,
        });
        return;
    }
    if (message.text === '/info') {
        const text = message_template_1.infoTemplate.message `${message.from.first_name} ${botName}`;
        telegramBot.sendMessage({
            chat_id: message.chat.id,
            text,
            ...message_template_1.infoTemplate.options,
        });
        return;
    }
}
async function onCallbackQuery(callbackQuery, telegramBot, botName) {
    if (callbackQuery.data === '/help') {
        const text = message_template_1.helpTemplate.message `${callbackQuery.from.first_name} ${botName}`;
        telegramBot.sendMessage({
            chat_id: callbackQuery.message.chat.id,
            text,
        });
    }
}
//# sourceMappingURL=telegram-bot.js.map