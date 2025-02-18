import axios from "axios";
import { ModifierIntegrationRequestPayload, ModifierIntegrationResponsePayload } from "./dto/modifier-integration.dto";

export async function sendFormattedMessageToChannel(
                telexReturnUrl: string, 
                channel_id: string, 
                payload: ModifierIntegrationResponsePayload) : Promise<void> {
    try {
        const url = telexReturnUrl + "/" + channel_id

        await axios.post(url, 
            payload, {
                headers: {
                    Accept: "application/json",
                },
            }
        );


    } catch (error) {
        this.logger.error(error.message)
        throw error
    }
}