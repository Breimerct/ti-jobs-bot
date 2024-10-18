"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('TI JOBS BOT')
        .setDescription('The TI JOBS BOT API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/doc', app, document);
    app.use((req, res, next) => {
        if (req.path === '/') {
            res.redirect('/api/v1/doc');
        }
        else {
            next();
        }
    });
    app
        .listen(PORT)
        .then(() => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
        .catch((error) => {
        console.error(`Error starting server: ${error.message}`);
    });
    return server;
}
bootstrap();
//# sourceMappingURL=main.js.map