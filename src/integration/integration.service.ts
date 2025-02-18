import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from './dto/modifier-integration.dto';
import axios from 'axios';
import { Message } from './message';
import { TaskModel } from 'src/db/task.model';
import { db, InMemoryDb } from 'src/db/inMemorydb';
import { sendFormattedMessageToChannel } from './util';



@Injectable()
export class IntegrationService {
    private logger = new Logger(IntegrationService.name)
    private readonly telexReturnUrl = "https://ping.telex.im/v1/return";
    private taskOperators = ['/tasks', '/task-done']



    async getMessageRequestPayload(payload: ModifierIntegrationRequestPayload): Promise<ModifierIntegrationResponsePayload> {
            
            this.logger.log("Message received")
            // console.log(payload)
            const message = this.trimHTMLTagsfromMessage(payload.message)
            if (message.startsWith("TODO")) {
                const formattedMessage = await this.formatMessage(message);

                // save to db
                await this.saveMessageToDB(payload);

                return new ModifierIntegrationResponsePayload(
                    "🎯 New task",
                formattedMessage,
                "success",
                "Task Bot"
                )
            }
            
            // use operators to display message
            if (this.taskOperators.includes(message)) {
                
                
                // delegate task operation to bot
                setImmediate(async () => {
                    const channelID = payload.settings.filter(setting => setting.label == "channelID")[0].default;
                    console.log("ChannelID: " + channelID)
                    const formattedMessage = await this.handleTaskOperation(message, channelID);
                    const botMessagePayload = new ModifierIntegrationResponsePayload(
                        "🎯 Task",
                        formattedMessage,
                        "success",
                        "Task Bot"
                    )
                    await sendFormattedMessageToChannel(this.telexReturnUrl, payload.channel_id, botMessagePayload)
                })
                
                // return the original messge back to channel
                return new ModifierIntegrationResponsePayload(
                    "message-formatted",
                    message,
                    "success",
                    "sender"
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


    async formatMessage(incomingMessage: string): Promise<string> {    
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
    
    

    async handleTaskOperation(operator: string, channel_id: string): Promise<string> {
        
        if (operator == '/tasks') {
            // get all tasks
            const allTasks = await this.fetchAllTasks(channel_id)
            let message = "";
            for (let task of allTasks) {
                message += this.composeTaskMessage(task);
            }
            
            return message ? message : "No pending task"
        }
    }

    composeTaskMessage(task: TaskModel): string {
        const id = `${task.task_ID}\n`;
        const description =  `◽Task: ${task.task_description}\n`;
        const assignedTo = `👨🏻‍💻 Assigned to: ${task.assigned_to}\n`;
        const dueBy = `📅 Due By: ${task.due_by}\n`;

        return  description + assignedTo + dueBy + "\n";
    }

    async saveMessageToDB(dto: ModifierIntegrationRequestPayload) {
        // save every incoming task into db
        try {
            dto.message = this.trimHTMLTagsfromMessage(dto.message);
            const messageHelper = new Message(dto.message);

            const newTask = new TaskModel();
            newTask.task_ID = "#" + (db.getCount() + 1);
            newTask.due = false;
            newTask.assigned_to = messageHelper.getAssignedToFromMessage();
            newTask.due_by = messageHelper.getDueDateFromMessage();
            newTask.task_description = messageHelper.getTaskFromMessage();
            newTask.channel_id = dto.channel_id;
 
            await db.save(newTask.task_ID, newTask);

           
            
        } catch (error) {
            console.log(error)
            this.logger.error(error.message);    
        }
        
    }

    async fetchAllTasks(channel_id: string) {
        return await db.findAll(channel_id)
    }
}
