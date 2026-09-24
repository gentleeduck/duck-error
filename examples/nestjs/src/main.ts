import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppErrorFilter } from './app-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AppErrorFilter())
  await app.listen(3000)
  // eslint-disable-next-line no-console
  console.log('nestjs example listening on http://localhost:3000')
}

bootstrap()
