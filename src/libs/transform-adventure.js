class TransformAdventure {
    constructor(Event, Prop, Scene, Player, Settings) {
        this.Event = Event;
        this.Prop = Prop;
        this.Scene = Scene;
        this.Player = Player;
        this.Settings = Settings;
    }

    toDocument (events, props, scenes, players, settings) {
        let adventure = {
            events: [...events] || [],
            props: [...props] || [],
            scenes: [...scenes] || [],
            players: [...players] || [],
            settings: settings
        };
    
        return adventure;
    }
    
    toObjects(adventure) {
        let events = adventure.events.map((e) => this.Event.create(e));
        let props = adventure.props.map((p) => this.Prop.create(p));
        let scenes = adventure.scenes.map((s) => this.Scene.create(s));
        let settings = this.Settings.create(adventure.settings);

        let objects = {
            events: events,
            props: props,
            scenes: scenes,
            //players: players,
            settings: settings
        }

        return objects;
    }
}

export {TransformAdventure as default};