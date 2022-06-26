import Event, {EventTypes} from "./../objects/event.js";
import Inventory from "./../objects/inventory.js";
import Item from "./../objects/item.js";
import Location from "./../objects/location.js";

import EvaluateCondition from "../libs/parser.js";

class StateMachine {
    constructor(adventure) {
        this.adventure = adventure;
    }

    process(userInput) {
        /**
         * 1. Check input events on items in the player's inventory
         * 2. Check input events in the player's location
         * 3. Check input events on items in the location's inventory
         * 4. Check input events globally
         * 5. Check non-input events in the same order
         * Lastly. Build a message list of what happened for the current user, and another for the other users in the game
         */

        return [
            {
                id: "a",
                messages: []
            },
            {
                id: "b",
                messages: []
            }
        ];
    }
};

export {StateMachine as default};