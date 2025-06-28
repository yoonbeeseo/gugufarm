import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;
  console.log('app is running on', port);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
