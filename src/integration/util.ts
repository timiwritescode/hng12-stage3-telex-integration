import axios from "axios";
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from "./dto/modifier-integration.dto";
import { TaskModel } from "src/db/task.model";

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
