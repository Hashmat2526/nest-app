import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipe/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //set global api prefix
  app.setGlobalPrefix('api/v1');
  //handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(3000, () =>
    console.log('server is up and running on port 3000'),
  );
}
bootstrap();
