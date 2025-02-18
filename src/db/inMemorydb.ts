import { TaskModel } from "./task.model";

export interface DbOperations {
    findAll(channelID: string): Promise<TaskModel[]>
    findOne(key: string): Promise<TaskModel | null>
    save(key: string, task: TaskModel): Promise<void>
    delete(key: string): Promise<void>
}

export class InMemoryDb implements DbOperations{
    private storage: Map<string, TaskModel> 
    private taskCount = 0;


    constructor() {
        this.storage = new Map<string, TaskModel>();
        this.taskCount = 0
    }

    async findAll(channelId: string): Promise<TaskModel[]> {
        const allTasks = Array.from(this.storage.values());
        const channelTasks = allTasks.filter(task => task.channel_id == channelId)

        return channelTasks;
    }

    async findOne(key: string): Promise<TaskModel | null> {
        return this.storage.get(key) ?? null;
    }

    async save(key: string, task: TaskModel): Promise<void> {
        this.storage.set(key, task)
        // increment task count
        this.taskCount += 1;
    }

    async delete(key: string): Promise<void> {}

    getCount() {
        return this.taskCount;
    }
    
}

export const db = new InMemoryDb()

export function seedDatabase() {
    let x = 0;
    
    while (x <= 10) {
        const taskID = "#" + (db.getCount() + 1)
        const newTask = new TaskModel();
        newTask.channel_id = "ID"
        newTask.assigned_to = "ZionOdebode";
        newTask.completed = false;
        newTask.due = false;
        newTask.due_by = "2025-02-24";
        newTask.task_ID = taskID;
        newTask.task_description = "Sleep away the day"

       db.save(taskID, newTask);

        x++;
    }
}

// seedDatabase();
