// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('CWD:', process.cwd());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(4000);
}
bootstrap();
