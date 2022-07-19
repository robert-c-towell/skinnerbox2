class Inventory {
    constructor(Item, size = 10, items = []) {
        if (!Item) {
            throw new Error(`Item class required.`);
        }
        if (typeof size !== "number") {
            throw new Error(`Property size must be a number.`);
        }
        if (!Array.isArray(items)) {
            throw new Error(`Property items must be an array.`);
        } else {
            let notAnItem;
            for (let i of items) {
                if (!(i instanceof Item)) {
                    notAnItem = i;
                    break;
                }
            }
            if (notAnItem) {
                throw new Error(`Property items must contain Items. Found: ${notAnItem}`);
            }
        }
        this.Item = Item;
        this.size = size;
        this.items = items;
    }

    static create(i) {
        return new Inventory(i.Item, i.size, i.items);
    }

    getSettableProps () {
        let i = this.Item;
        delete this.Item;

        let props = structuredClone(this);
        delete props.id;
        delete props.items;

        this.Item = i;
        return props;
    }

    add (item) {
        if (!(item instanceof this.Item)) {
            throw new Error(`Adding non-Item to Inventory. Item: ${JSON.stringify(item)}`);
        }
        if (this.items.length + item.size <= this.size) {
            this.items.push(item.id);
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