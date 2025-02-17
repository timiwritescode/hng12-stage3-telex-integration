import { Body, Controller, Get, Post } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';
import { ModifierIntegrationRequestPayload } from './dto/modifier-integration.dto';

@Controller('')
export class IntegrationController {
    constructor(private integrationService: IntegrationService) {}
    @Get("integrations/modifier/integration.json")
    getModifierJson() {
        return MODIFIER_JSON;
    }


    @Post("/format-message") 
    formatMessage(
        @Body()
        reqBody: ModifierIntegrationRequestPayload
    ) {
        return this.integrationService.handleFormatMessageRequest(reqBody)
    }
}
