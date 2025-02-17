import { Module } from '@nestjs/common';
import { IntegrationController } from './integration/integration.controller';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [IntegrationModule]
})
export class AppModule {}
