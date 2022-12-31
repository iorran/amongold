# amongold
The original version of among us to baby boomers



# features

## Create Rooms

POST

/rooms

BODY

{
    "name": "{name}"
}

## Join Rooms

POST

/rooms/{roomId}/players/{name}

## List Players from a room

GET

/rooms

## Get the room status and their players

GET

/rooms/{id}

RESPONSE

{
    "status": "WAITING" | "STARTED",
    "joiners": [
            {
            "_id": "63b07fe80629991fba636d98",
            "roomId": "de3f0f",
            "name": "Carlos"
            }
        ]
}

## Start Game

POST

/game/start?roomId={roomId}

## Restart Game

POST

/game/restart
