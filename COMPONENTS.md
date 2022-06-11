# Multiplayer Text Adventures - Game Components

## Building blocks for a text adventure construction language
* Settings
  * A list of options or fields filled by the author
  * Static during a game
* Event Engine
  * If event is a command
    * Check if the command exists in an item in the player's inventory
    * Check if the command exists in the location
    * Check if the command exists based on npc's or other players in the same location
    * Check if the command exists in the global commands list, prefering author-created ones over default
    * *Customizable so it check custom objects for commands, in the order deemed appropriate by the author*
  * Evaluate all conditions
  * If a valid event, execute its effects and show message
  * If invalid and the event is a command, show message
* Event
  * User types a command
  * User enters a room
  * User acquires an item
  * Another user enters the same room as the current user
  * Another user interacts with the current user
  * Events have conditions, effects, and messages (success, failure, maybe more?)
* Command
  * Can use pattern matching
* Conditions
  * Support infinitely deep boolean logic
  * Can evaluate if any property of any object is equal to some value (true/false, numbers, strings)
  * Support pattern matching
  * Can evaluate settings and variables
  * Can check if an object or variable exists
* Effects
  * Set any object or variable's property (increment, decrement)
  * Create new objects or variables
* Object
  * A building block of the adventure. Items, Rooms, Connections, Players, NPCs, and Custom Objects are all objects
  * Has a type
  * Has state
  * Can have inventory
  * Commands
  * Custom properties
* Room
  * Has inventory
* Connection
  * Knows 2 rooms
  * Knows which way they can be accessed
  * Has state

## Example Values
* `settings`
  * Save checkpoints or save anywhere
  * Save on an interval, or only when player uses save command
  * Number of players
  * chat distance
  * 
* `room`
  * `connection` - connection to another room
    * `directional` - is it a 1-way or 2-way movement
    * `direction` - (north, south, east, west, up, down, custom)
  * `save_checkpoint`
* `player`
  * `inventory`
  * `location`
  * `nickname` - name of the character in-game (ex. 'the giant waves')
* `item`
* `variables` - with types (flag/bool, number/float, text/string)
  * built in variables
    * `orientation` - to enable commands like 'go left' based on player orientation/heading
    * `
* `npc`
  * `loction`
  * `mood` - friendly, enemy
  * `path` - traveling behavior, perhaps messages it says in these locations
  * `hp`
  * `inventory`
* custom objects
  * editor which allows user to create a new kind of type and its properties
* `commands`
  * `help`
  * `time` - number of turns since the game started
  * `save`
