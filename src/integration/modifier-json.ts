import { config } from "dotenv";

config({path: ".env"})


const target_url = process.env.TARGET_URL;
const tick_url = process.env.TICK_URL;
const website = process.env.WEBSITE;

// export const MODIFIER_JSON = {
//     data: {
//         author: "Odebode Oluwatimilehin",
//         date: {
//             created_at: "2025-02-17",
//             updated_at: "2025-02-17"
//         },
//         descriptions: {
//                 app_description: "A task message formatter that formats every message that starts with 'TODO' as a task message",
//                 app_logo: "https://i.imgur.com/lZqvffp.png",
//                 app_name: "Task Log",
//                 app_url: "https://hng12-stage3-telex-integration-production.up.railway.app",
//                 background_color: "#ffffff"
//         },
//         integration_category: "Project Management",
//         integration_type: "interval",
//         is_active: true,
//         key_features: [
//             "Receive message from telex channels.",
//             "Format message based on predefined Logic and template.",
//             "Send formatted message back to channel.",
//         ],
//         permissions: {
//             // events: [
//             //     "Receive message from telex channels.",
//             //     "Format message based on predefined Logic and template.",
//             //     "Send formatted message back to channel.",
//             // ],
            
//             "monitoring_user": {
//                 "always_online": true,
//                 "display_name": "Custom Performance Monitor"
//             }
                
//         },
//         settings: [
//             {"label": "site-1", "type": "text", "required": true, "default": ""},
//             {"label": "site-2", "type": "text", "required": true, "default": ""},
//             {"label": "interval", "type": "text", "required": true, "default": "* * * * *"}
//         ],
//         target_url,
//         tick_url,
//         website
//     },

// }

export const MODIFIER_JSON = {
    "data": {
        "date": {
            "created_at": "2025-02-14",
            "updated_at": "2025-02-14"
        },
        "descriptions": {
            "app_name": "Uptime Monitor",
            "app_description": "Monitors website uptime",
            "app_url": "https://hng12-stage3-telex-integration-production.up.railway.app",
            "app_logo": "https://i.imgur.com/lZqvffp.png",
            "background_color": "#fff"
        },
        "integration_category": "Monitoring & Logging",
        "integration_type": "interval",
        "is_active": true,
        "key_features": ["checks the health of site"],
        "permission": {
            "monitoring_user": {
                "always_online": true,
                "display_name": "Custom Performance Monitor"
            }
        },
        "settings": [
            {"label": "site-1", "type": "text", "required": true, "default": ""},
            {"label": "site-2", "type": "text", "required": true, "default": ""},
            {"label": "interval", "type": "text", "required": true, "default": "* * * * *"}
        ],
        "tick_url": `${tick_url}`,
        "target_url": `${target_url}`,
        // "target_url": `https://ping.telex.im/v1/return/01950183-8235-7b80-a9c8-8eb2a4632619`,
        "return_url": "https://ping.telex.im/v1/return/01950183-8235-7b80-a9c8-8eb2a4632619"
    }

}