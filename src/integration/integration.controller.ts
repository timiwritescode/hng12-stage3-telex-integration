import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';
import { ModifierIntegrationRequestPayload } from './dto/modifier-integration.dto';

@Controller('')
export class IntegrationController {
    constructor(private integrationService: IntegrationService) {}
    @Get("integration.json")
    getModifierJson(
        @Req()
        req
    ) {
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
