import { Injectable, NotFoundException } from "@nestjs/common";
import { db, InMemoryDb } from "src/db/inMemorydb";
import { TaskModel } from "src/db/task.model";

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
}