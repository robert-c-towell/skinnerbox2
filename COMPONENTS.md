# Multiplayer Text Adventures - Game Components

#### Components
* `settings`
  * Save checkpoints or save anywhere
  * Save on an interval, or only when player uses save command
  * Number of players
  * chat distance
  * 
* `room`
  * `connection` - connection to another room
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
  * `mood` - friendly, enemy
  * `path` - traveling behavior, perhaps messages it says in these locations
  * `hp`
  * `inventory`
* custom types
  * editor which allows user to create a new kind of type and its properties
* `commands`
  * `help`
  * `time` - number of turns since the game started
  * `save`
