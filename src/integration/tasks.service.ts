import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { db, InMemoryDb } from "src/db/inMemorydb";
import { TaskModel } from "src/db/task-model";
import { TASK_DELETE, TASK_DONE } from "./constants/task-operatiors-expression";
import { Message } from "./message";


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
        const allTasks = await db.findAll({channel_id, completed: false, due: false})
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

    async handleTaskDelete(operator: string, channel_id: string) {
        if (TASK_DELETE.test(operator) == false) {
            const errorMessage = `Invalid operator for marking tasks as done. \t\n correct format is /tasks-done <task_id> e.g /tasks-delete #123` 
            
            throw new BadRequestException(errorMessage)  
        }
        const taskId = '#' + operator.split('#')[1]

        const task = await db.findOne(taskId, {channel_id: channel_id});
        if (!task) {
            throw new NotFoundException('⛔ Task not found')
        }
        await db.delete(task.task_ID);
        
    }

    async handleMarkTaskAsDoneOperation(operator: string, channel_id: string): Promise<string> {
        
        if (TASK_DONE.test(operator) == false) {
            const errorMessage = `Invalid operator for deleting task.\n correct format is /tasks-done <task_id> e.g /tasks-done #123` 
            const message = Message.composeErrorMessage(errorMessage)
            return message  
        } 
        const taskId = '#' + operator.split('#')[1]
        
        const task = await this.markTasksAsDone(taskId, channel_id);
        const message = Message.composeTaskDoneMessage(task)
        return message;
    }


    handleFetchBotInfo(): string {
        return `📝TASK WATCH🎯 
        ABOUT
        Task Watch is a task management tool for handling tasks creation and assignment, tasks management and reminder, and setting deadlines for tasks in a team on a telex channel.
        
        USAGE
        TODO: <task> @<assignee> /d YYYY-MM-DD HH:MM
        e.g TODO: boil water to make eba @someone /d 2025-02-21 18:00
        returns: 
        ◽ New Task: boil water to make eba
        👨🏻‍💻 Assigned to: @someone
        📅 Due By: 2025-02-21 18:00

        /tasks: To get all incomplete tasks
        e.g tasks
        
        /tasks-done: to get all complete tasks
        /tasks-due: to get all due tasks`
    }

    handleFetchBotManPage(): string {
        return `📝TASK WATCH🎯
        USAGE

        Commands are defined below as:
        <command>: <function>
        
        DOCS:
        /tasks-man: to get a list of commands (this command brought you here 🙃)
        /tasks-info: to get full documentation with example usages

        OPERATIONS:
        TODO: <task> @assignee /d yyyy-mm-dd 24hr format time:  to set a new task
        /tasks: TO get all incomplete tasks
        /tasks-done: to get all complete tasks
        /tasks-done <id>: to mark a task as done
        /tasks-due: to get all tasks passed deadline
        /tasks-delete <id>: to mark task as delete
        `
    }
}