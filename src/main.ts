import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = await readFile('./doc/api.yaml', { encoding: 'utf-8' });
  SwaggerModule.setup('doc', app, parse(document));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
