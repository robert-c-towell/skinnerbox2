# Development Design Decisions

#### JSON
This project works with a lot of josn. The adventures and save files are stored and can be accessed as json documents in MongoDB. The front end parses json while deplaying the game to the users, and constructs json while the author is creating the game. It stands to reason that the state machine should also process json so there are not a lot of needless conversions. So, case closed rgiht? Sort of.

I've decided to use javascript prototypal classes. This will allow me to maintain separation of concerns and guarentee operations are made on the correct pieces of data.

#### Document structure
The example_adventure.json document is structured in a way that nearly every model has an id and that id is references throughout the document. Due to the nature of MongoDB storage, it would be simple and easy to denormalize the data so that one object exists inside another that it belongs to. For example, I have opted to do this with State inside Locations, Items, and so on. I could have extended this pattern to storing Items in Inventorys instead of just storing the Item id in the Inventory. I ultimately chose to separate these models out into their own lists for ease of processing the data at each step of the game. If the items were stored in the Inventorys in memory, then I would need to either search each Inventory, or manipulate the data into a list. Either can be cumbersome since Items can have Inventories themselves. By storing the items in a top level list to begin with I am saving processing steps.