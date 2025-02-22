import axios from "axios";
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from "./dto/modifier-integration.dto";
import { TaskModel } from "src/db/task-model";

export async function sendFormattedMessageToChannel(
                telexReturnUrl: string, 
                channel_id: string, 
                payload: ModifierIntegrationResponsePayload) : Promise<void> {
    try {
        const url = telexReturnUrl + "/" + channel_id
        const response = await axios.post(url, 
            payload, {
                headers: {
                    Accept: "application/json",
                },
            }
        );
        console.log(response.status)

    } catch (error) {
        this.logger.error(error.message)
        throw error
    }
}


export function getTimeString(time: Date | null) {
    if (!time) return ''
    const now = new Date();
    
    if (time < now) {
        return 'due'
    }

    const differenceInMilliseconds = time.getTime() - now.getTime()

    const hourDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    )
    return `${hourDifference}hrs ${minutesDifference}mins time`;

};


export function formatDateTime(date: Date): string {
    const weekday = date.toLocaleString('en-US', { weekday: 'long' }); // Wednesday
    const month = date.toLocaleString('en-US', { month: 'long' }); // January
    const year = date.getFullYear(); // 2024
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // 13:00

    return `${weekday}, ${month} ${year}, ${time}`;
}
