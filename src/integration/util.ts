import axios from "axios";
import { ModifierIntegrationRequestPayload } from "./dto/modifier-integration.dto";

export async function sendFormattedMessageToChannel(reqPayload: ModifierIntegrationRequestPayload) {
    try {
        const url = this.telexReturnUrl + "/" + reqPayload.channel_id
        const resPayload = await this.getMessageRequestPayload(reqPayload)
        await axios.post(url, 
            resPayload, {
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