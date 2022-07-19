import Inventory from "./inventory.js";
import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(id = uuidv4(), name, size = 1, inventory = null, state, states, events = null) {
        if (!name) {
            throw new Error(`Name is a required parameter.`);
        } else if (name && typeof name !== "string") {
            throw new Error(`Name must be a string.`);
        }
        if (inventory && !(inventory instanceof Inventory)) {
            throw new Error(`Adding non-Inventory to Item. Inventory: ${JSON.stringify(inventory)}`);
        }
        if (!state) {
            throw new Error(`State is a required parameter.`);
        } else if (state && typeof state !== "string") {
            throw new Error(`State must be a string.`);
        }
        if (!states) {
            throw new Error(`States is a required parameter.`);
        } else if (states && !Array.isArray(states)) {
            throw new Error(`States must be a string.`);
        }
        this.id = id;
        this.name = name;
        this.size = size;
        this.inventory = inventory;
        this.state = state;
        this.states = states;
        this.events = events;
    }

    static create(i) {
        return new Item(i.id, i.name, i.size, i.inventory, i.state, i.states, i.events);
    }

    getSettableProps () {
        let props = structuredClone(this);
        delete props.id;
        delete props.inventory;
        return props;
    }
}

export {Item as default};