import Inventory from "./inventory.js";
import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(id = uuidv4(), size = 1, inventory = null) {
        this.id = id;
        this.size = size;
        this.inventory = inventory;
    }

    getSettableProps () {
        let props = structuredClone(this);
        delete props.inventory;
        return props;
    }
}

export {Item as default};