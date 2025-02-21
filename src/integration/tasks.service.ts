import { Injectable, NotFoundException } from "@nestjs/common";
import { db, InMemoryDb } from "src/db/inMemorydb";
import { TaskModel } from "src/db/task.model";
import { TASK_DONE } from "./constants/task-operatiors-expression";
import { Message } from "./message";

@Injectable()
export class TaskService {
    async markTasksAsDone(taskID: string, channel_id: string): Promise<TaskModel> {
        try {
            const task = await db.findOne(taskID, {channel_id, completed: false});
            if (task == null) {
                throw new NotFoundException("No incomplete tasks with that ID found")
            }
            
            task.completed = true;
            return task
        } catch (error) {
            throw error;
        }
    }

    async handleFetchAllTasksOperation(channel_id) {
        const allTasks = await db.findAll({channel_id})
        let message = '';
                for (let task of allTasks) {
                    message += Message.composeFetchAllTasksMessage(task);
                }
    
                
            message = message ? message : "No pending task"
            return message
    }

    async handleFetchAllCompletedTasks(channel_id: string): Promise<string> {
        const tasks = await db.findAll({channel_id: channel_id, completed: true})
        return Message.composeFetchAllCompletedTaskMessage(tasks);
    }

    private handleTak

    async handleMarkTaskAsDoneOperation(operator: string, channel_id: string): Promise<string> {
        
        if (TASK_DONE.test(operator) == false) {
            const errorMessage = `Invalid operator for marking tasks as done. \n correct format is /tasks-done <task_id>
                                    \n e.g /tasks-done #123` 
            const message = Message.composeErrorMessage(errorMessage)
            return message  
        } 
        const taskId = '#' + operator.split('#')[1]
        
        const task = await this.markTasksAsDone(taskId, channel_id);
        const message = Message.composeTaskDoneMessage(task)
        return message;
    }

}