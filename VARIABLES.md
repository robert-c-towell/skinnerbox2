# Evaluating variables

Conditions need to check whether some element of the adventure has some value. For example, if an item is in a certain state, or if the number of players in a room is more than 2. To check these values, we need a way to navigate from the data to the value. Below I outline my plan:

Storage of variables in JSON will use the object . pattern, `location.inventory.size` for instance. Some references could be circular, like `player.location.players[0].location`, so each keyword between the `.`s will be evaluated separately, looking up new objects as needeed, rather than building out one huge adventure object and navigating it.

Conditions can reference groups of variables dependant on the event type and the object the event is attached to. Events with type `INPUT` have access to `player`. Events attached to an item and location have access to `item` and `location` respectively. All events can access `global`, where custom variables are stored, and `settings` where the game settings are stored. Settings variables are the only variables which cannot be modified during a game.

```
{
    global.number_of_players
    settings.useCheckpoints
    location.name
    location.state
    location.inventory
    player.hp
    player.nickname
    player.location
    player.inventory
}
```