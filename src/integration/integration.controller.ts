import { Controller, Get } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { MODIFIER_JSON } from './modifier-json';

@Controller('')
export class IntegrationController {
    constructor(private integrationService: IntegrationService) {}

    @Get("/modifier/integration.json")
    getModifierJson() {
        return MODIFIER_JSON;
    }
}
