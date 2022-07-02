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

    process(message) {
        if (message.type === EventTypes.GENERAL) {
            throw new Error(`Parameter message cannot be type general.`);
        }
        /**
         * 1. Check input events on items in the player's inventory
         * 2. Check input events in the player's location
         * 3. Check input events on items in the location's inventory
         * 4. Check input events globally
         * 5. Check non-input events in the same order
         * Lastly. Build a message list of what happened for the current user, and another for the other users in the game
         */

        let executableEvents = [];

        // 1. Check input events on items in the player's inventory
        let playerInventory = this.adventure.players.find(p => p.name === message.player).inventory;
        for (let i of playerInventory) {
            let events = i.events.filter(e => e.type === EventTypes.INPUT);
            for (let e of events) {
                let conditionsAreMet = this.parser.parse(e.conditions);
                if (conditionsAreMet) {
                    executableEvents.push(e);
                }
            }
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