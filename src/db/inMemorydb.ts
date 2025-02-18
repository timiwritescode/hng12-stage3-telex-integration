import { TaskModel } from "./task.model";

export interface DbOperations {
    findAll(): Promise<TaskModel[]>
    findOne(key: string): Promise<TaskModel | null>
    save(key: string, task: TaskModel): Promise<void>
    delete(key: string): Promise<void>
}

export class InMemoryDb implements DbOperations{
    private storage: Map<string, TaskModel> 
    private taskCount = 0


    constructor() {
        this.storage = new Map<string, TaskModel>()
    }

    async findAll(): Promise<TaskModel[]> {
        return Array.from(this.storage.values())
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



// export const inMemoryDB: TaskModel[] = [];