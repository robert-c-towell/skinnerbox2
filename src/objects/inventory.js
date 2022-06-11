class Inventory {
    constructor(size = 10, items = []) {
        this.size = size;
        this.items = items;
    }

    add (item) {
        if (this.items.length < this.size) {
            this.items.push(item);
            return true;
        } else {
            return false;
        }
    }

    remove (itemId) {
        let index = this.items.findIndex((i) => i.id = itemId);
        this.items.splice(index, 1);
    }

    toString () {
        let data =  {
            size: this.size,
            items: this.items
        };
        
        return JSON.stringify(data);
    }
}

export {Inventory as default};