class Location {
    constructor(type, state = null, states = null, events = null) {
        this.type = type;
        this.state = state;
        this.states = states;
        this.events = events;
    }
};

export {Location as default};