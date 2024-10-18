"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoTemplate = exports.channelTemplate = exports.startTemplate = exports.helpTemplate = void 0;
exports.helpTemplate = {
    message: (_, userName, botName) => `Hola ${userName}, soy ${botName} 🤖 ` +
        'Puedes usar los siguientes comandos:\n\n' +
        '/start - Inicia la conversación con el bot\n' +
        '/help - Muestra los comandos disponibles\n' +
        '/channel - Muestra el canal de empleos\n' +
        '/info - Muestra información de ayuda\n',
};
exports.startTemplate = {
    message: (_, userName, botName) => `Hola ${userName}, soy ${botName} 🤖 ` +
        'un bot que maneja un canal de empleos en colombia.\n\n' +
        'Para ver las **vacantes**, puedes acceder al canal aquí 👇\n',
    options: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'TI JOBS',
                        url: 'https://t.me/ti_jobs',
                    },
                ],
            ],
        },
        parse_mode: 'Markdown',
    },
};
exports.channelTemplate = {
    message: (_, userName, botName) => `Hola ${userName}, soy ${botName} 🤖 ` +
        'Puedes acceder al canal de empleos aquí 👇',
    options: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'TI JOBS',
                        url: 'https://t.me/ti_jobs',
                    },
                ],
            ],
        },
    },
};
exports.infoTemplate = {
    message: (_, userName, botName) => `Hola ${userName}, soy ${botName} 🤖 ` +
        'Puedes pedir ayuda con el comando /help o ' +
        'hacer click en el botón de abajo 👇',
    options: {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Ayuda',
                        callback_data: '/help',
                    },
                ],
            ],
        },
        parse_mode: 'Markdown',
    },
};
//# sourceMappingURL=message-template.js.map