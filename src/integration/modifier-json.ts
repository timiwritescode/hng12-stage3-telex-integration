import { config } from "dotenv";

config({path: ".env"})


const target_url = process.env.TARGET_URL;
const tick_url = process.env.TICK_URL;
const website = process.env.WEBSITE;

export const MODIFIER_JSON = {
    data: {
        author: "Odebode Oluwatimilehin",
        date: {
            created_at: "2025-02-17",
            updated_at: "2025-02-17"
        },
        descriptions: {
                app_description: "A task message formatter that formats every message that starts with 'TODO' as a task message",
                app_logo: "https://i.imgur.com/lZqvffp.png",
                app_name: "Task Log",
                app_url: "https://hng12-stage3-telex-integration-production.up.railway.app",
                background_color: "#ffffff"
        },
        integration_category: "Project Management",
        integration_type: "interval",
        is_active: true,
        key_features: [
            "Receive message from telex channels.",
            "Format message based on predefined Logic and template.",
            "Send formatted message back to channel.",
        ],
        permission: {
            // events: [
            //     "Receive message from telex channels.",
            //     "Format message based on predefined Logic and template.",
            //     "Send formatted message back to channel.",
            // ],
            
            "monitoring_user": {
                "always_online": true,
                "display_name": "Custom Performance Monitor"
            }
                
        },
        settings: [
            {
                default: "TODO",
                label: "taskMessageMarker",
                required: true,
                type: "text"
            }
        ],
        target_url,
        tick_url,
        website
    },

}