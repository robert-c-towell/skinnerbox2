# Development Design Decisions

#### JSON
This project works with a lot of josn. The adventures and save files are stored and can be accessed as json documents in MongoDB. The front end parses json while deplaying the game to the users, and constructs json while the author is creating the game. It stands to reason that the state machine should also process json so there are not a lot of needless conversions. So, case closed rgiht? Sort of.

I've decided to use javascript prototypal classes. This will allow me to maintain separation of concerns and guarentee operations are made on the correct pieces of data.
