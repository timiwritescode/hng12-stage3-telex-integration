import { IsNotEmpty } from "class-validator"

export class ModifierIntegrationResponsePayload {
    event_name: string
    message: string
    status: string
    username: string

    constructor(
        event_name: string,
        message: string,
        status: string,
        username: string
    ) {
        this.event_name = event_name;
        this.message = message;
        this.status = status;
        this.username = username
    }
}

export class ModifierIntegrationRequestPayload {
    @IsNotEmpty()
    channel_id: string;

    @IsNotEmpty()
    settings: IntegrationSettings[];

    @IsNotEmpty()
    message: string

    
    
}

interface IntegrationSettings {
    label: string,
    type: string,
    description: string,
    default: string,
    required: boolean
}