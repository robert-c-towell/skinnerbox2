# Evaluating variables

Conditions need to check whether some element of the adventure has some value. For example, if an item is in a certain state, or if the number of players in a scene is more than 2. To check these values, we need a way to navigate from the data to the value. Below I outline my plan:

Storage of variables in JSON will use the object . pattern, `scene.size` for instance. Some references could be circular, like `player.scene.players[0].scene`, so each keyword between the `.`s will be evaluated separately, looking up new objects as needeed, rather than building out one huge adventure object and navigating it.

Conditions can reference groups of variables dependant on the event type and the object the event is attached to. Events with type `INPUT` have access to `player`. Events attached to an item and scene have access to `item` and `scene` respectively. All events can access `global`, where custom variables are stored, and `settings` where the game settings are stored. Settings variables are the only variables which cannot be modified during a game.

```
{
    global.number_of_players
    settings.useCheckpoints
    scene.name
    scene.state
    player.hp
    player.nickname
    player.scene
}
```