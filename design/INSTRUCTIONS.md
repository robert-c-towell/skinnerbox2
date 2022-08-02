#### Movement
* go north
* north
* n
* go back
* climb up
* swim down
* enter washer
* get up
* sit

#### Interaction
* talk to bob
* speak with bob
* wave at bob
* say hello to bob

#### Handling
* push lever
* pull lever
* close locket
* open door
* unlock door
* get blue candle
* drop blue candle
* throw the candle
* turn flask
* move statue

#### Investigating
* examine note
* examine skyline

#### Senses
* eat pizza
* drink water
* smell flower

#### Miscelaneous utility
* cut rope
* strike rock
* wear cloak
* use tool
* light match

#### Notes
* Objects' descriptions change based on what they are in, on, near, or if they are open, closed, unlocked, etc.
* The description details where items are located until they are taken. Then it says "these items are here: "
* Instructions have synonyms
* Objects have synonyms
* On death offer restart, load, quit
* Add potential for raising a dead player
* Every object has some instructions that can be run on them
* Objects in a scene have descriptions

</hr>

### Author Objects
* Everything is an Object and can inhert properties
* Objects support state and actions being taken on them
* Scenes are objects which the player can move to.
* Scenes have Exits
* Exits can know about other exits they are connected to and can share state
* Scenes have Props.
* Props can have actions and state, like any other object. Some can be picked up, while others cant
* Actors can move between Scenes and can carry Props
* Actors have StageDirections for behavior
* Actors have Scripts for interaction
* Players are actors which can be controlled. They do not have Scripts or StageDirections
* Actual objects:
    * Prop
    * Scene
    * Actor
* Action

### Game Objects
* Interactable interface
* 
* Action
    * instruction and synonyms
    * pairs of conditions to check and outcomes
* Scenes have a rule like useParentExits when seated
* Scenes have a rule like useParentDescriptions when seated
* Object base class
    * List of actions
* Persona

### Actions
* go *noun*
* get *noun*
* close *noun*
* shoot bear with bow
* shoot bow at bear
* 
* *noun*

### Logic
* Objects need to be stored in memory as a map so they can be easily accessed
* Objects need to reference their parents and their children so the list of objects in the scene can be constructed quickly
* At each instruction, a list of all relevant objects is constructed from the map
* Action if/else must support no tailing else, so the evaluator will continue to the next object rather than performing an interaction here.
* The player objects must be in the current scene object list for things like `wave bob` to work.
* After receiving an instruction from the player, check objects for a name which matches the *noun* and has the instruction's *verb* on it:
    * player
    * props on the player
    * scene the player is in
    * players on the scene the player is in
    * props on the scene the player is in
    * recursively check for objects on objects at each of the above steps
* One-word commands that are not in the engine list or the author-defined list, are normally interpreted as exit names, or as responses when interacting with something
* Actions cannot be added or removed from an object