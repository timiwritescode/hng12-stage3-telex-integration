import { getTimeString } from "src/integration/util";

export class TaskModel {
    task_ID: string;

    task_description: string;

    assigned_to: string

    due_by: string;

    due: boolean;

    completed: boolean;

    channel_id: string;

    dateTime: Date;

    createdAt: Date;

    getTimeRemaining(): string {
        return getTimeString(this.dateTime)
    }

    getDueTime() {
        return 
    }
}