class TransformAdventure {
    constructor(Event, Item, Scene, Player, Settings) {
        this.Event = Event;
        this.Item = Item;
        this.Scene = Scene;
        this.Player = Player;
        this.Settings = Settings;
    }

    toDocument (events, items, scenes, players, settings) {
        let adventure = {
            events: [...events] || [],
            items: [...items] || [],
            scenes: [...scenes] || [],
            players: [...players] || [],
            settings: settings
        };
    
        return adventure;
    }
    
    toObjects(adventure) {
        let events = adventure.events.map((e) => this.Event.create(e));

        let items = adventure.items.map((i) => {
            i = this.Item.create(i);
            return i;
        });

        let scenes = adventure.scenes.map((l) => {
            l = this.Scene.create(l);
            return l;
        });

        //let settings = this.Settings.create(adventure.settings);

        let objects = {
            events: events,
            items: items,
            scenes: scenes,
            //players: players,
            //settings: settings
        }

        return objects;
    }
}

export {TransformAdventure as default};