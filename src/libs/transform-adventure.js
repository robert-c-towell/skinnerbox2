class TransformAdventure {
    constructor(Event, Inventory, Item, Location, Player, Settings) {
        this.Event = Event;
        this.Inventory = Inventory;
        this.Item = Item;
        this.Location = Location;
        this.Player = Player;
        this.Settings = Settings;
    }

    toDocument (events, items, locations, players, settings) {
        let adventure = {
            events: [...events] || [],
            items: [...items] || [],
            locations: [...locations] || [],
            players: [...players] || [],
            settings: settings
        };
    
        return adventure;
    }
    
    toObjects(adventure) {
        let Item = this.Item;
        function inventoryToObject(inventory) {
            if (inventory === null || inventory === undefined) {
                return null;
            }

            let items = inventory.items.map((i) => {
                let itemInventory = inventoryToObject(i.inventory);
                i = Item.create(i);
                i.inventory = itemInventory;
                return i;
            });
            inventory = this.Inventory.create(inventory);
            inventory.items = items;
            return inventory;
        }

        let events = adventure.events.map((e) => this.Event.create(e));

        let items = adventure.items.map((i) => {
            let inventory = inventoryToObject(i.inventory);
            i = Item.create(i);
            i.inventory = inventory;
            return i;
        });

        let locations = adventure.locations.map((l) => {
            let inventory = inventoryToObject(l.inventory);
            l = this.Location.create(l);
            l.inventory = inventory;
            return l;
        });
        
        let players = adventure.players.map((p) => {
            let inventory = inventoryToObject(p.inventory);
            p = this.Player.create(p);
            p.inventory = inventory;
            return p;
        });

        let settings = this.Settings.create(adventure.settings);

        let objects = {
            events: events,
            items: items,
            locations: locations,
            players: players,
            settings: settings
        }

        return objects;
    }
}

export {TransformAdventure as default};