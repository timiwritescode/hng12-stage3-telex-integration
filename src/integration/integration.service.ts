import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from './dto/modifier-integration.dto';
import axios from 'axios';
import { Message } from './message';
import { TaskModel } from 'src/db/task.model';
import { InMemoryDb } from 'src/db/inMemorydb';



@Injectable()
export class IntegrationService {
    private logger = new Logger(IntegrationService.name)
    private readonly telexReturnUrl = "https://ping.telex.im/v1/return";
    private db: InMemoryDb

    constructor() {
        this.db = new InMemoryDb();
    }


    getMessageRequestPayload(message: string): ModifierIntegrationResponsePayload {
            
            this.logger.log("Message received")
            message = this.trimHTMLTagsfromMessage(message)
            if (message.startsWith("TODO")) {
                
                return new ModifierIntegrationResponsePayload(
                    "🎯 New task",
                this.formatMessage(message),
                "success",
                "Task Bot"
                )
            }
            console.log("formatting not needed")
    
            // else leave it as is
            return new ModifierIntegrationResponsePayload(
                "New Task",
                message,
                "success",
                "Task Bot"
            )            
    }


    formatMessage(incomingMessage: string): string {    
        this.logger.log("formatting started")
        const message = new Message(incomingMessage);
        const task = `◽ New Task: ${message.getTaskFromMessage()} \n`
        const assignedTo = `👨🏻‍💻 Assigned to: ${message.getAssignedToFromMessage()} \n`
        const dueBy = `📅 Due By: ${message.getDueDateFromMessage()}\n`
        
        return task + assignedTo + dueBy;
    }

    private trimHTMLTagsfromMessage(message: string) {
        return message.replace(/<[^>]*>/g, '').trim();
    }
    
    async sendFormattedMessageToChannel(channel_id: string, message: string) {
        try {
            console.log(channel_id)
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

    async saveMessageToDB(dto: ModifierIntegrationRequestPayload) {
        // save every incoming task into db
        try {
            dto.message = this.trimHTMLTagsfromMessage(dto.message);
            const messageHelper = new Message(dto.message);

            const newTask = new TaskModel();
            newTask.task_ID = "#" + (this.db.getCount() + 1);
            newTask.due = false;
            newTask.assigned_to = messageHelper.getAssignedToFromMessage();
            newTask.due_by = messageHelper.getDueDateFromMessage();
            newTask.task_description = messageHelper.getTaskFromMessage();
            newTask.channel_id = dto.channel_id;

            await this.db.save(newTask.task_ID, newTask);

            console.log(await this.db.findAll())
            
        } catch (error) {
            this.logger.error(error.message);    
        }
        
    }

    fetchAllTasks() {
        
    }
}
