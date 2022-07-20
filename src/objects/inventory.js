class Inventory {
    constructor(size = 10, items = []) {
        if (typeof size !== "number") {
            throw new Error(`Property size must be a number.`);
        }
        if (!Array.isArray(items)) {
            throw new Error(`Property items must be an array.`);
        }
        this.size = size;
        this.items = items;
    }

    static create(i) {
        return new Inventory(i.size, i.items);
    }

    getSettableProps () {
        let props = structuredClone(this);
        delete props.id;
        delete props.items;
        return props;
    }

    add (itemId, size = 0) {
        if (typeof itemId !== "string") {
            throw new Error(`Item must be a string`);
        }
        if (this.items.length + size <= this.size) {
            this.items.push(itemId);
            return true;
        } else {
            return false;
        }
    }

    remove (itemId) {
        let index = this.items.findIndex((id) => id === itemId);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

export {Inventory as default};