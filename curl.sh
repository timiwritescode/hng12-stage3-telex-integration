H! /bin/bash

curl -X POST "http://localhost:3000/format-message" \
     -H "Content-Type: application/json" \
     -d '{
       "channel_id": "0192dd70-cdf1-7e15-8776-4fee4a78405e",
       "settings": [
         {"label": "maxMessageLength", "type": "number", "default": 30, "required": true},
         {"label": "repeatWords", "type": "multi-select", "default": "world, happy", "required": true},
         {"label": "noOfRepetitions", "type": "number", "default": 2, "required": true}
       ],
       "message": "TODO: Hello, world. I hope you are happy today"
     }'