import { Injectable, NotFoundException } from "@nestjs/common";
import { db, InMemoryDb } from "src/db/inMemorydb";
import { TaskModel } from "src/db/task.model";

@Injectable()
export class TaskService {
    async markTasksAsDone(taskID: string, channel_id: string): Promise<TaskModel> {
        try {
            const task = await db.findOne(taskID);
            if (!task || 
                task.channel_id != channel_id) {
                throw new NotFoundException("Task not found")
            }
            if (task == null) {
                throw new NotFoundException("Task not found")
            }
            
            task.completed = true;
            return task
        } catch (error) {
            throw error;
        }
        
        
        
    }
}