import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';
import { ModifierIntegrationRequestPayload } from './dto/modifier-integration.dto';


@Controller('')
export class IntegrationController {

    constructor(private integrationService: IntegrationService) {}
    @Get("integration.json")
    getModifierJson() {
        return MODIFIER_JSON;
        }
    


    @Post("/format-message") 
    @HttpCode(200)
    async formatMessage(
        @Body()
        reqBody: ModifierIntegrationRequestPayload
    ) {
        const formattedMessage =  await this.integrationService.getMessageRequestPayload(reqBody);
        
        return {
            event_name: formattedMessage.event_name,
            message: formattedMessage.message,
            status: formattedMessage.status,
            username: formattedMessage.username
        };
    }
}
