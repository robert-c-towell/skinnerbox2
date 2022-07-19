import Event, {EventTypes} from "./../objects/event.js";
import Inventory from "./../objects/inventory.js";
import Item from "./../objects/item.js";
import Location from "./../objects/location.js";

import Parser from "../libs/parser.js";

class StateMachine {
    constructor(adventure) {
        this.parser = Parser.create();
        this.adventure = adventure;
    }

    /**
     * 
     * @param {*} message - player input
     * @returns 
     */
    process(message) {
        /**
         * 1. Check input events on items in the player's inventory
         * 2. Check input events in the player's location
         * 3. Check input events on items in the location's inventory
         * 4. Check input events globally
         * 5. Check non-input events in the same order
         * 6. Execute the events
         * 7. Lastly, build a message list of what happened for the current player, and another for the other players
         */

        let executableInputEvents = [];
        let executableGeneralEvents = [];

        function filterEvents(events) {
            let executableInputEvents = [];
            let executableGeneralEvents = [];

            for (let e of events) {
                let conditionsAreMet = this.parser.parse(e.conditions);
                if (conditionsAreMet) {
                    if (e.type = EventTypes.INPUT) {
                        executableInputEvents.push(e);
                    } else {
                        executableGeneralEvents.push(e);
                    }
                }
            }

            return {
                input: executableInputEvents,
                general: executableGeneralEvents
            }
        }

        // 1. Check input events on items in the player's inventory
        let playerInventory = this.adventure.players.find(p => p.name === message.player).inventory;
        for (let i of playerInventory) {
            let {inputEvents, generalEvents} = filterEvents(i.events);
            executableInputEvents.concat(inputEvents);
            executableGeneralEvents.concat(inputEvents);
        }

        for (event of executableEvents) {
            let response = this.parser.parse(event);
            
        }

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