import { TaskModel } from "./task-model";

export interface DbOperations {
    findAll(where: Partial<TaskModel>): Promise<TaskModel[]>
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

    async findAll(where?: Partial<TaskModel>): Promise<TaskModel[]> {
        let allTasks = Array.from(this.storage.values());
        if (where) {
            allTasks = allTasks.filter(task =>
                Object.entries(where).every(([key, value]) => (task as any)[key] === value)
            );
        

        return allTasks;
    }
}

    async findOne(key: string, where?: Partial<TaskModel>): Promise<TaskModel | null> {
        const task =  this.storage.get(key) ?? null;

        if (task && where) {
            const matches = Object.entries(where).every(([field, value]) => (task as any)[field] === value);
            return matches ? task : null;
        }

        return task;
    }

    async save(key: string, task: TaskModel): Promise<void> {
        this.storage.set(key, task)
        // increment task count
        this.taskCount += 1;
    }

    async delete(key: string): Promise<void> {
        this.storage.delete(key);
    }

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
