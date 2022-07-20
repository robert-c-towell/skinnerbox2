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
        let Inventory = this.Inventory;
        function inventoryToObject(inventory) {
            if (inventory === null || inventory === undefined) {
                return null;
            }
            inventory = Inventory.create(inventory);
            return inventory;
        }

        let events = adventure.events.map((e) => this.Event.create(e));

        let items = adventure.items.map((i) => {
            let inventory = inventoryToObject(i.inventory);
            i.inventory = inventory;
            i = this.Item.create(i);
            return i;
        });

        let locations = adventure.locations.map((l) => {
            let inventory = inventoryToObject(l.inventory);
            l.inventory = inventory;
            l = this.Location.create(l);
            return l;
        });
        
        // let players = adventure.players.map((p) => {
        //     let inventory = inventoryToObject(p.inventory);
        //     p.inventory = inventory;
        //     p = this.Player.create(p);
        //     return p;
        // });

        //let settings = this.Settings.create(adventure.settings);

        let objects = {
            events: events,
            items: items,
            locations: locations,
            //players: players,
            //settings: settings
        }

        return objects;
    }
}

export {TransformAdventure as default};