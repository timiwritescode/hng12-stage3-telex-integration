import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';


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
    @HttpCode(200)
    async formatMessage(
        @Body()
        reqBody
    ) {
        // messageQueue.push(reqBody)
        console.log(reqBody)
        const formattedMessage =  await this.integrationService.getMessageRequestPayload(reqBody);
        
        return {
            event_name: formattedMessage.event_name,
            message: formattedMessage.message,
            status: formattedMessage.status,
            username: formattedMessage.username
        };
    }
}
