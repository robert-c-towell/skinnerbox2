class TransformAdventure {
    constructor(Effect, Event, Inventory, Item, Location, Player, Settings, State) {
        this.Effect = Effect;
        this.Event = Event;
        this.Inventory = Inventory;
        this.Item = Item;
        this.Location = Location;
        this.Player = Player;
        this.Settings = Settings;
        this.State = State;
    }

    toDocument (events, items, locations, players, settings) {
        let adventure = {
            events: [...events] || [],
            items: [...items] || [],
            locations: [...locations],
            players: [...players],
            settings: settings
        };
    
        return adventure;
    }
    
    toObjects(adventure) {
        function inventoryToObject(inventory) {
            if (inventory === null || inventory === undefined) {
                return null;
            }

            let items = inventory.items.map((i) => {
                let itemInventory = inventoryToObject(i.inventory);
                i = (new this.Item()).parseJSON(i);
                i.inventory = itemInventory;
                return i;
            });
            inventory = (new this.Inventory()).parseJSON(inventory);
            inventory.items = items;
            return inventory;
        }

        let events = adventure.events.map((e) => {
            let effects = e.effects.map((ef) => {
                ef = (new this.Effect()).parseJSON(ef);
                return ef;
            });
            e = (new this.Event()).parseJSON(e);
            e.effects = effects;
            return e;
        });

        let items = adventure.item.map((i) => {
            let inventory = inventoryToObject(i.inventory);
            let states = i.states.map((s) => {
                s = (new this.State()).parseJSON(s);
                return s;
            });
            i = (new this.Item()).parseJSON(i);
            i.inventory = inventory;
            i.states = states;
            return i;
        });

        let locations = adventure.locations.map((l) => {
            let inventory = inventoryToObject(l.inventory);
            let states = l.states.map((s) => {
                s = (new this.State()).parseJSON(s);
                return s;
            });
            l = (new this.Location()).parseJSON(l);
            l.inventory = inventory;
            l.states = states;
            return l;
        });
        
        let players = adventure.players.map((p) => {
            let inventory = inventoryToObject(p.inventory);
            p = (new this.Player()).parseJSON(p);
            p.inventory = inventory;
            return p;
        });

        let settings = (new this.Settings()).parseJSON(adventure.settings);

        let variables = adventure.variables.map((v) => {
            v = (new this.Variable()).parseJSON(v);
            return v;
        });

        let objects = {
            events: events,
            items: items,
            locations: locations,
            npcs: npcs,
            players: players,
            settings: settings,
            variables: variables,
        }

        return objects;
    }
}

export {TransformAdventure as default};