import axios from "axios";
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from "./dto/modifier-integration.dto";

export async function sendFormattedMessageToChannel(
                telexReturnUrl: string, 
                channel_id: string, 
                payload: ModifierIntegrationResponsePayload) : Promise<void> {
    try {
        const url = telexReturnUrl + "/" + channel_id
        console.log(url)
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