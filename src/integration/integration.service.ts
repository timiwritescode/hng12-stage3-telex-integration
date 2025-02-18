import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from './dto/modifier-integration.dto';
import axios from 'axios';
import { Message } from './message';



export class IntegrationService {
    private logger = new Logger(IntegrationService.name)
    private readonly telexReturnUrl = "https://ping.telex.im/v1/return"


    getMessageRequestPayload(message: string): ModifierIntegrationResponsePayload {
        
            if (message.startsWith("TODO")) {
                return new ModifierIntegrationResponsePayload(
                    "🎯 New task",
                this.formatMessage(message),
                "success",
                "Task Bot"
                )
            }
    
            // else leave it as is
            return new ModifierIntegrationResponsePayload(
                "New Task",
                message,
                "success",
                "Task Bot"
            )            
        

    }

    formatMessage(incomingMessage: string): string {    
        const message = new Message(incomingMessage);
        const task = `◽ New Task: ${message.getTaskFromMessage()} \n`
        const assignedTo = `👨🏻‍💻 Assigned to: ${message.getAssignedToFromMessage()} \n`
        const dueBy = `📅 Due By: ${message.getDueDateFromMessage()}\n`

        return task + assignedTo + dueBy;
    }

    
    async sendFormattedMessageToChannel(channel_id: string, message: string) {
        try {
            const channelID = channel_id;
            const url = this.telexReturnUrl + "/" + channelID
            
            // send message to channel
            const response = await axios.post(url, 
                this.getMessageRequestPayload(message), {
                    headers: {
                        Accept: "application/json"
                    }
            });
            
        } catch (error) {
            this.logger.error(error.message)
            throw error
        }
    }
}
