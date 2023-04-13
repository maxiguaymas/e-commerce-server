import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { defaultUser } from './config/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  const configService = app.get(ConfigService);

  const userService = app.get(UserService);

  defaultUser(configService, userService); // CREATE DEFAULT ADMIN USER

  const port = parseInt(configService.get<string>('PORT')) || 3000;

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Server')
    .addBearerAuth()
    .setDescription('The E-Commerce server documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }));


  await app.listen(port);



  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
