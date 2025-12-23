import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from 'src/config';
import { AllExceptionFilter } from 'src/lib/exception/AllException';
import { AppModule } from './app.module';

const PORT = config.API_PORT;
const api = 'api/v1'// config.API_VERSION;

export class Aplication {
  static async main(): Promise<void> {
    // ========================= DATABASE =========================

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    app.useStaticAssets(path.join(process.cwd(), config.BASE_URL), {
      prefix: '/' + config.BASE_URL + '/',
    });

    app.set('trust proxy', true);

    app.enableCors({
      origin: [
        'https://www.ustatop.org.uz',
        'https://ustatop.org.uz',
        'https://ustatopuz.netlify.app',
        'https://ustatopadminpanel.netlify.app',
      ],
      credentials: true,
    });

    app.useGlobalFilters(new AllExceptionFilter());

    // ========================= VALIDATSIYA =========================

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // ========================= COOKIE =========================
    app.use(cookieParser());

    // ========================= GLOBAL URL =========================
    app.setGlobalPrefix(api);

    // ========================= SWAGGER =========================
    const configSwagger = new DocumentBuilder()
      .setTitle('Ustatop.uz')
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();

    const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup(api, app, documentSwagger);

    const logging = new Logger('Swagger-Ustatop.uz');

    // ========================= PORT =========================

    await app.listen(PORT, '0.0.0.0', () => {
      logging.log(`Swagger UI: http://localhost:${PORT}/${api}`); // config.APP_URL
    });
  }
}
