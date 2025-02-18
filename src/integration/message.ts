export class Message {
    private message: string;

    constructor(messsage: string) {
        this.message = messsage;

    }

    getTaskFromMessage(): string {
        let task = this.message.split("TODO:")[1].split("@")[0];
        return task
    }

    getAssignedToFromMessage(): string {
        // get the user to whom task was assigned
        if (!this.message.includes("@")) return "Not Assigned";
        
        const assignedTo = this.message.split("@")[1].includes("/d") ?   // cater for if there is date
                            "@"+ this.message.split("@")[1].split("/d")[0].trim() :
                            "@" + this.message.split("@")[1].trim()
        
        return assignedTo;
    }

    getDueDateFromMessage(): string {
        // get the date and time a task is to be completed
        if (!this.message.includes("/d")) return "N/A";
        const dueDate = this.message.split("/d")[1]
        return dueDate;
    }

}