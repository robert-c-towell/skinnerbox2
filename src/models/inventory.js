class Inventory {
    constructor(size = 10, items = []) {
        this.size = size;
        this.items = items;
    }

    add (item) {
        // TODO: check for valid item
        if (typeof item != Object) {
            throw new Error(`Adding non-item to inventory. Item: ${JSON.stringify(item)}`);
        }
        if (this.items.length < this.size) {
            this.items.push(item);
            return true;
        } else {
            return false;
        }
    }

    remove (itemId) {
        let index = this.items.findIndex((i) => i.id = itemId);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

export {Inventory as default};