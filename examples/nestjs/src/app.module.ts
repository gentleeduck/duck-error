import { Module } from '@nestjs/common'
import { WidgetsController } from './widgets.controller'

@Module({
  controllers: [WidgetsController],
})
export class AppModule {}
