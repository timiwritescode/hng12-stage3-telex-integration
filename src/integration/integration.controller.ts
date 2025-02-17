import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';
import { ModifierIntegrationRequestPayload } from './dto/modifier-integration.dto';

@Controller('')
export class IntegrationController {
    constructor(private integrationService: IntegrationService) {}
    @Get("integrations/modifier/integration.json")
    getModifierJson(
        @Req()
        req
    ) {
        const baseUrl = `${req["protocol"]}://${req.headers["host"]}`
        return {
            "data": {
                "date": {
                    "created_at": "2025-02-14",
                    "updated_at": "2025-02-14"
                },
                "descriptions": {
                    "app_name": "Uptime Monitor",
                    "app_description": "Monitors website uptime",
                    "app_url": baseUrl,
                    "app_logo": "https://i.imgur.com/lZqvffp.png",
                    "background_color": "#fff"
                },
                "integration_category": "Monitoring & Logging",
                "integration_type": "interval",
                "is_active": true,
                "key_features": ["checks the health of site"],
                "permission": {
                    "monitoring_user": {
                        "always_online": true,
                        "display_name": "Custom Performance Monitor"
                    }
                },
                "settings": [
                    {"label": "site-1", "type": "text", "required": true, "default": ""},
                    {"label": "site-2", "type": "text", "required": true, "default": ""},
                    {"label": "interval", "type": "text", "required": true, "default": "* * * * *"}
                ],
                "tick_url": `${baseUrl}/tick`,
                "target_url": `${baseUrl}/tick`,
                // "target_url": `https://ping.telex.im/v1/return/01950183-8235-7b80-a9c8-8eb2a4632619`,
                "return_url": "https://ping.telex.im/v1/return/01950183-8235-7b80-a9c8-8eb2a4632619"
            }
        
    }
        };
    }


    @Post("/format-message") 
    formatMessage(
        @Body()
        reqBody: ModifierIntegrationRequestPayload
    ) {
        return this.integrationService.handleFormatMessageRequest(reqBody)
    }
}
