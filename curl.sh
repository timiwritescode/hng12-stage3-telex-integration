#! /bin/bash

# curl -X POST "http://localhost:3000/format-message" \
#      -H "Content-Type: application/json" \
#      -d '{
#        "channel_id": "019500d7-83b4-7b4b-9a50-9800f4454229",
#        "settings": [
#          {"label": "maxMessageLength", "type": "number", "default": 30, "required": true},
#          {"label": "channelID", "type": "text", "default": "019500d7-83b4-7b4b-9a50-9800f4454229", "required": true},
#          {"label": "repeatWords", "type": "multi-select", "default": "world, happy", "required": true},
#          {"label": "noOfRepetitions", "type": "number", "default": 2, "required": true}
#        ],
#        "message": "TODO: boil water @gas /d 5mins"
#      }'



# curl -X POST "http://localhost:3000/format-message" \
#      -H "Content-Type: application/json" \
#      -d '{
#        "channel_id": "019500d7-83b4-7b4b-9a50-9800f4454229",
#        "settings": [
#          {"label": "maxMessageLength", "type": "number", "default": 30, "required": true},
#          {"label": "channelID", "type": "text", "default": "019500d7-83b4-7b4b-9a50-9800f4454229", "required": true},
#          {"label": "repeatWords", "type": "multi-select", "default": "world, happy", "required": true},
#          {"label": "noOfRepetitions", "type": "number", "default": 2, "required": true}
#        ],
#        "message": "TODO: turn eba @pot and turner /d 5mins"
#      }'



curl -X POST "http://localhost:3000/format-message" \
     -H "Content-Type: application/json" \
     -d '{
       "channel_id": "019500d7-83b4-7b4b-9a50-9800f4454229",
       "settings": [
         {"label": "maxMessageLength", "type": "number", "default": 30, "required": true},
         {"label": "channelID", "type": "text", "default": "019500d7-83b4-7b4b-9a50-9800f4454229", "required": true},
         {"label": "repeatWords", "type": "multi-select", "default": "world, happy", "required": true},
         {"label": "noOfRepetitions", "type": "number", "default": 2, "required": true}
       ],
       "message": "/tasks-done #2"
     }'