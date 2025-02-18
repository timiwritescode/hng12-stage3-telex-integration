import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';
import { ModifierIntegrationRequestPayload } from './dto/modifier-integration.dto';
import { sendFormattedMessageToChannel } from './util';

const integrationService = new IntegrationService()

const messageQueue: Array<ModifierIntegrationRequestPayload> = [];

// save 
async function saveTaskToDB() {
    while (messageQueue.length > 0) {
        const payload = messageQueue.shift();
        // console.log(payload)
        try {
                        
            // await sendFormattedMessageToChannel(payload);
        } catch(error) {
            console.error("Message queue processing error: " + error.message)
        }
    }
}


setInterval(() => {
    saveTaskToDB()
}, 1000)

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
        const formattedMessage =  await integrationService.getMessageRequestPayload(reqBody);
        
        return {
            event_name: formattedMessage.event_name,
            message: formattedMessage.message,
            status: formattedMessage.status,
            username: formattedMessage.username
        };
    }
}
