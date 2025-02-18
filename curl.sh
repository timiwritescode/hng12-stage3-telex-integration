#! /bin/bash

curl -X POST "http://localhost:3000/format-message" \
     -H "Content-Type: application/json" \
     -d '{
       "channel_id": "01951573-182f-7f1a-8fbd-4896defcbdb0",
       "settings": [
         {"label": "maxMessageLength", "type": "number", "default": 30, "required": true},
         {"label": "repeatWords", "type": "multi-select", "default": "world, happy", "required": true},
         {"label": "noOfRepetitions", "type": "number", "default": 2, "required": true}
       ],
       "message": "/tasks"
     }'