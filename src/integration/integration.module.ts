import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { TaskService } from './tasks.service';

@Module({
    controllers: [IntegrationController],
    providers: [IntegrationService, TaskService]

})
export class IntegrationModule {}
