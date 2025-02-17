import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from './dto/modifier-integration.dto';

interface FormatedMessage {
    task: string,
    assigned_to: string,
    due_by: string
}

@Injectable()
export class IntegrationService {
    private logger = new Logger(IntegrationService.name)
    handleFormatMessageRequest(dto: ModifierIntegrationRequestPayload): ModifierIntegrationResponsePayload {
        try {
            if (dto.message.startsWith("TODO")) {
                return new ModifierIntegrationResponsePayload(
                    "message_formatted",
                this.formatMessage(dto.message),
                "success",
                "message-formatter-bot"
                )
            }
    
            // else leave it as is
            return new ModifierIntegrationResponsePayload(
                "message_formatted",
                dto.message,
                "success",
                "message-formatter-bot"
            )            
        } catch (error) {
            this.logger.error(error.message)
            throw new InternalServerErrorException("An error occured")
        }

    }

    formatMessage(message: string): string {
        const messageCompartments = message.split("TODO:");
        // let formattedMessage:FormatedMessage; 
        const task = "◽New Task: task desc \n"
        const assignedTo = "👨🏻‍💻Assigned to: @john \n"
        const dueBy = "📅 Due: 18-02-2025 \n"

        return task + assignedTo + dueBy;
    }
}
