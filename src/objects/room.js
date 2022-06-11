class Room {
    constructor(type, state = null, states = null, events = null) {
        this.type = type;
        this.state = state;
        this.states = states;
        this.events = events;
    }

    toString () {
        let data = {
            type: this.type,
            state: this.state,
            states: this.states
        };

        return JSON.stringify(data);
    }
};

export {Room as default};