import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from './dto/modifier-integration.dto';
import axios from 'axios';
import { Message } from './message';
import { TaskModel } from 'src/db/task-model';
import { db, InMemoryDb } from 'src/db/inMemorydb';
import { sendFormattedMessageToChannel } from './util';
import { TASK_DONE } from './constants/task-operatiors-expression';
import { TaskService } from './tasks.service';
import { channel } from 'diagnostics_channel';



@Injectable()
export class IntegrationService {
    private logger = new Logger(IntegrationService.name)
    private readonly telexReturnUrl = "https://ping.telex.im/v1/return";
    private taskOperators = ['/tasks', '/tasks-done']
    private taskService = new TaskService();
    

    async getMessageRequestPayload(payload: ModifierIntegrationRequestPayload): Promise<ModifierIntegrationResponsePayload> {
        const message = this.trimHTMLTagsfromMessage(payload.message)
        payload.channel_id = payload.settings.filter(setting => setting.label == "channelID")[0].default;
        if (message.startsWith("TODO")) {
            const formattedMessage = await this.formatMessage(message);
             // save to db
             try {
                await this.saveTaskToDB(payload);
             } catch(error) {
                this.logger.error(error.message);
                const modifiedMessage = "<b><i>❌ task bot internal error for operation: " + message + "</i></b>"
                return new ModifierIntegrationResponsePayload(
                    "message-formatted",
                    modifiedMessage,
                    "success",
                    "sender" 
                )
             }
            
        
            return new ModifierIntegrationResponsePayload(
                "🎯 New task",
            formattedMessage,
            "success",
            "Task Bot"
            )
        }
        
        // use operators to display message
        if (message.includes("/tasks")) {
            
            
            // delegate task operation to bot
            const channelID = payload.settings.filter(setting => setting.label == "channelID")[0].default;
            setImmediate(async () => {
                
                const formattedMessage = await this.handleTaskOperation(message, channelID);
                const botMessagePayload = new ModifierIntegrationResponsePayload(
                    "🎯 Task",
                    formattedMessage,
                    "success",
                    "Task Bot"
                )
                await sendFormattedMessageToChannel(this.telexReturnUrl, channelID, botMessagePayload)
            })
            
            // return the original messge back to channel
            const modifiedMessage = "<b><i>🎯 performed task operation: " + message + "</i></b>"
            return new ModifierIntegrationResponsePayload(
                "message-formatted",
                modifiedMessage,
                "success",
                "sender" 
            )
        }
             // else leave it as is
        return new ModifierIntegrationResponsePayload(
            "Original Message",
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
        let message = "";
        try {
            
            if (operator == '/tasks-info') {
                // get documentation
                return this.taskService.handleFetchBotInfo();
            }

            if (operator == '/tasks-man') {
                // get list of commands
                return this.taskService.handleFetchBotManPage()
            }

            if (operator == '/tasks') {
                // get all tasks
                return await this.taskService.handleFetchAllTasksOperation(channel_id)
            }
            
            if (operator == '/tasks-done') {
                // get all completed tasks in a channel
                return await this.taskService.handleFetchAllCompletedTasks(channel_id)
            }

            if (operator.includes('/tasks-delete')) {
                await this.taskService.handleTaskDelete(operator, channel_id);
                return '🚯 Task deleted'
            }

            if (operator.includes('/tasks-done')) {
                // expecting a message in the format
                // /tasks-done <task_id> to mark a task as completed
                return await this.taskService.handleMarkTaskAsDoneOperation(operator, channel_id)
            }
 
            
        } catch (error) {
        if (error.response) {
            message = Message.composeErrorMessage(error.message)
            return message
            
            
        } else {
            this.logger.error(error.message)
            message = Message.composeErrorMessage("An error occured within app");
            return message
        }
        }

    }

    


    async saveTaskToDB(dto: ModifierIntegrationRequestPayload) {
        // save every incoming task into db
        try {
            dto.message = this.trimHTMLTagsfromMessage(dto.message);
            const messageHelper = new Message(dto.message);

            const newTask = new TaskModel();
            newTask.task_ID = "#" + (db.getCount() + 1);
            newTask.due = false;
            newTask.completed = false;
            newTask.assigned_to = messageHelper.getAssignedToFromMessage();
            newTask.due_by = messageHelper.getDueDateFromMessage();
            newTask.task_description = messageHelper.getTaskFromMessage();
            newTask.channel_id = dto.channel_id;
 
            await db.save(newTask.task_ID, newTask);
        } catch (error) {
            throw error    
        }
        
    }
}
