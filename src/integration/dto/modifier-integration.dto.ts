import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator"

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
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => IntegrationSettings)
    settings: IntegrationSettings[];

    @IsNotEmpty()
    message: string

    
    
}

class IntegrationSettings {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    default: string;

    @IsNotEmpty()
    @IsBoolean()
    required: boolean
}